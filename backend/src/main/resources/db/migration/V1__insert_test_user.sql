INSERT INTO users (id, name, email, password, created_at, updated_at)
VALUES (
           1,
           'Test User',
           'test@example.com',
           '$2a$10$dummyhashedpassword1234567890123456789012345678901234',
           CURRENT_TIMESTAMP,
           CURRENT_TIMESTAMP
       );