CREATE DATABASE 8chan;
use 8chan;

CREATE TABLE posts (
  id int(12) unsigned not null auto_increment,
  text varchar(140) not null,
  name varchar(140) default null,
  created_at datetime not null default current_timestamp,
  updated_at datetime not null default current_timestamp on update current_timestamp,
  primary key (id)
);