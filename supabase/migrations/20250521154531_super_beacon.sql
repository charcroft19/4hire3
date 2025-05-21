/*
  # Clear all authentication data
  
  1. Changes
    - Delete all existing auth data
    - Reset sequences
*/

-- Clear all data
DELETE FROM profiles;
DELETE FROM auth.users;
DELETE FROM auth.identities;
DELETE FROM auth.sessions;
DELETE FROM auth.refresh_tokens;

-- Reset sequences
ALTER SEQUENCE IF EXISTS auth.users_id_seq RESTART WITH 1;
ALTER SEQUENCE IF EXISTS auth.identities_id_seq RESTART WITH 1;
ALTER SEQUENCE IF EXISTS auth.sessions_id_seq RESTART WITH 1;