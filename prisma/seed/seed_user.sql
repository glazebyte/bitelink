INSERT INTO users (id, name, email, email_verified, image)
VALUES
    (UUID(), 'Alice', 'alice@example.com', '2025-01-01 10:00:00', 'https://example.com/alice.jpg'),
    (UUID(), 'Bob', 'bob@example.com', NULL, 'https://example.com/bob.jpg'),
    (UUID(), 'Charlie', 'charlie@example.com', '2025-01-02 15:30:00', 'https://example.com/charlie.jpg'),
    (UUID(), 'Diana', 'diana@example.com', '2025-01-03 08:45:00', 'https://example.com/diana.jpg'),
    (UUID(), 'Eve', 'eve@example.com', NULL, 'https://example.com/eve.jpg');
