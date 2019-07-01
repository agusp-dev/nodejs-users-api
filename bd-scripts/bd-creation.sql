CREATE DATABASE nodeusers;

USE nodeusers;

CREATE TABLE user (
    `id` INT AUTO_INCREMENT,
    `username` VARCHAR(50) NOT NULL,
    `password` VARCHAR(250) NOT NULL,
    `names` VARCHAR(70),
    `surnames` VARCHAR(70),
    `age` INT,
    `email` VARCHAR(70),
    PRIMARY KEY (`id`)
);