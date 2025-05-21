/*
  # Create profiles table with security policies

  1. New Tables
    - `profiles`
      - `id` (uuid, primary key, references auth.users)
      - `username` (text)
      - `email` (text, unique, required)
      - `type` (text, required, either 'student' or 'employer')
      - `university` (text, must be valid domain for students)
      - `avatar` (text)
      - `bio` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on profiles table
    - Add policies for authenticated users to:
      - Create their own profile
      - Read their own profile
      - Update their own profile
*/

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can create own profile" ON profiles;
DROP POLICY IF EXISTS "Users can read own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;

-- Drop and recreate the profiles table
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

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create policies
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

-- Create trigger to update updated_at timestamp
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