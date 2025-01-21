INSERT INTO Link (userId, originalUrl, shortUrl, clicks, isPrivate, createdAt, updatedAt)
VALUES
    ((SELECT id FROM users WHERE email = 'zakyfauzi44@gmail.com'), 'https://example.com/original-1', 'short1', 10, false, '2025-01-01 12:00:00', '2025-01-05 12:00:00'),
    ((SELECT id FROM users WHERE email = 'bob@example.com'), 'https://example.com/original-2', 'short2', 5, true, '2025-01-02 14:00:00', '2025-01-06 14:00:00'),
    ((SELECT id FROM users WHERE email = 'charlie@example.com'), 'https://example.com/original-3', 'short3', 20, false, '2025-01-03 10:00:00', '2025-01-07 10:00:00'),
    ((SELECT id FROM users WHERE email = 'alice@example.com'),, 'https://example.com/original-4', 'short4', 0, false, '2025-01-04 16:00:00', '2025-01-08 16:00:00'),
    ((SELECT id FROM users WHERE email = 'diana@example.com'), 'https://example.com/original-5', 'short5', 15, true, '2025-01-05 09:00:00', '2025-01-09 09:00:00');
