
CREATE DATABASE IF NOT EXISTS CS174;

USE CS174;

CREATE TABLE users (
        userID int NOT NULL AUTO_INCREMENT,
		password VARCHAR(128) NOT NULL,
        email VARCHAR(128) NOT NULL UNIQUE,
        PRIMARY KEY (userID)
);

CREATE TABLE tasks (
    taskID int NOT NULL AUTO_INCREMENT,
    userID int not null,
    task VARCHAR(256) not null,
    status int not null,
    PRIMARY KEY (taskID), 
    FOREIGN KEY (userID) REFERENCES users(userID)
);