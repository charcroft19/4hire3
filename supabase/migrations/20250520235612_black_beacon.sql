/*
  # Clear authentication data

  1. Changes
    - Delete all user profiles
    - Delete all auth users
    - Reset auth identities
    - Reset auth sessions

  2. Security
    - Maintains RLS policies
    - Preserves table structure
*/

-- First delete all profiles (due to foreign key constraint)
DELETE FROM profiles;

-- Delete all auth data
DELETE FROM auth.users;
DELETE FROM auth.identities;
DELETE FROM auth.sessions;