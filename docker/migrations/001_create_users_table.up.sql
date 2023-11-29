create database if not exists test;
use test;

create table if not exists users
(
    id        int(11)      NOT NULL AUTO_INCREMENT,
    firstname varchar(255) NULL,
    lastname  varchar(255) NULL,
    password varchar(255) NULL,
    PRIMARY KEY (id)
    ) ENGINE = InnoDB;