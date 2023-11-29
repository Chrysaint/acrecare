create database if not exists chat;
use chat;

create table if not exists messages
(
    `id` INT( 5 ) NOT NULL AUTO_INCREMENT ,
    `name` VARCHAR( 200 ) NOT NULL ,
    `message` VARCHAR( 1000 ) NOT NULL ,
    PRIMARY KEY (  `id` )
    ) ENGINE = InnoDB;