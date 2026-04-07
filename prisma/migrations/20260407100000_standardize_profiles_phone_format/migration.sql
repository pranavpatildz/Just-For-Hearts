CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS profiles (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  phone text UNIQUE NOT NULL,
  name text,
  email text,
  city text,
  preferred_language text,
  source text,
  created_at timestamp with time zone DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'profiles'
      AND policyname = 'Allow all'
  ) THEN
    CREATE POLICY "Allow all"
    ON profiles
    FOR ALL
    USING (true)
    WITH CHECK (true);
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'unique_phone'
  ) THEN
    ALTER TABLE profiles
    ADD CONSTRAINT unique_phone UNIQUE (phone);
  END IF;
END $$;

UPDATE profiles
SET phone = CASE
  WHEN LENGTH(phone) = 10 THEN '+91' || phone
  WHEN phone LIKE '91%' THEN '+' || phone
  ELSE phone
END;
