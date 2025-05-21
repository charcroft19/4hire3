/*
  # Initial schema setup with profiles table
  
  1. New Tables
    - `profiles`
      - `id` (uuid, primary key, references auth.users)
      - `username` (text)
      - `email` (text, unique, not null)
      - `type` (text, not null, either 'student' or 'employer')
      - `university` (text, must be valid domain for students)
      - `avatar` (text)
      - `bio` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
  
  2. Security
    - Enable RLS on profiles table
    - Add policies for INSERT, SELECT, and UPDATE
*/

CREATE TABLE IF NOT EXISTS profiles (
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

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

DO $$ 
BEGIN
  -- Create INSERT policy if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'profiles' 
    AND policyname = 'Users can create own profile'
  ) THEN
    CREATE POLICY "Users can create own profile"
      ON profiles
      FOR INSERT
      TO authenticated
      WITH CHECK (auth.uid() = id);
  END IF;

  -- Create SELECT policy if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'profiles' 
    AND policyname = 'Users can read own profile'
  ) THEN
    CREATE POLICY "Users can read own profile"
      ON profiles
      FOR SELECT
      TO authenticated
      USING (auth.uid() = id);
  END IF;

  -- Create UPDATE policy if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'profiles' 
    AND policyname = 'Users can update own profile'
  ) THEN
    CREATE POLICY "Users can update own profile"
      ON profiles
      FOR UPDATE
      TO authenticated
      USING (auth.uid() = id)
      WITH CHECK (auth.uid() = id);
  END IF;
END $$;