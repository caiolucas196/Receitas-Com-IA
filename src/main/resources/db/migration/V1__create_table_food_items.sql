CREATE TABLE food_item (
                           id BIGINT AUTO_INCREMENT PRIMARY KEY,
                           name VARCHAR(255) NOT NULL,
                           quantity INT NOT NULL,
                           expiration_date DATE NOT NULL
);