CREATE DATABASE cross_knowledge;

USE cross_knowledge;

CREATE TABLE person (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    last_name VARCHAR(100),
    address VARCHAR(1000)
);
