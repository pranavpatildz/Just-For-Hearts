ALTER TABLE users
ADD COLUMN IF NOT EXISTS phone text;

UPDATE users
SET mobile = CASE
  WHEN LENGTH(mobile) = 10 THEN '+91' || mobile
  WHEN mobile LIKE '91%' THEN '+' || mobile
  ELSE mobile
END
WHERE mobile IS NOT NULL;

UPDATE users
SET phone = CASE
  WHEN phone IS NOT NULL AND phone LIKE '+91%' THEN phone
  WHEN phone IS NOT NULL AND phone ~ '^91[0-9]{10}$' THEN '+' || phone
  WHEN phone IS NOT NULL AND phone ~ '^[0-9]{10}$' THEN '+91' || phone
  WHEN mobile IS NOT NULL AND mobile LIKE '+91%' THEN mobile
  WHEN mobile IS NOT NULL AND mobile ~ '^91[0-9]{10}$' THEN '+' || mobile
  WHEN mobile IS NOT NULL AND mobile ~ '^[0-9]{10}$' THEN '+91' || mobile
  ELSE phone
END
WHERE phone IS NULL
   OR phone NOT LIKE '+91%';

UPDATE users
SET mobile = phone
WHERE phone LIKE '+91%';

CREATE UNIQUE INDEX IF NOT EXISTS users_mobile_key
ON users(mobile);
