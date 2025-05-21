/*
  # Force clear all authentication data
  
  This migration:
  1. Forcefully removes all data
  2. Resets sequences
  3. Rebuilds tables and policies
*/

-- Disable RLS temporarily to allow cleanup
ALTER TABLE profiles DISABLE ROW LEVEL SECURITY;

-- Clear all data
TRUNCATE TABLE profiles CASCADE;
TRUNCATE TABLE auth.users CASCADE;
TRUNCATE TABLE auth.identities CASCADE;
TRUNCATE TABLE auth.sessions CASCADE;
TRUNCATE TABLE auth.refresh_tokens CASCADE;

-- Reset sequences
ALTER SEQUENCE auth.users_id_seq RESTART WITH 1;
ALTER SEQUENCE auth.identities_id_seq RESTART WITH 1;
ALTER SEQUENCE auth.sessions_id_seq RESTART WITH 1;

-- Recreate profiles table
DROP TABLE IF EXISTS profiles;

CREATE TABLE profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  username text,
  email text UNIQUE NOT NULL,
  type text NOT NULL CHECK (type IN ('student', 'employer')),
  university text CHECK (
    type = 'employer' OR 
    university IN ('colorado.edu', 'colostate.edu', 'sdsu.edu')
  ),
  avatar text,
  bio text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Re-enable RLS and recreate policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can create own profile"
  ON profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can read own profile"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Recreate trigger for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();