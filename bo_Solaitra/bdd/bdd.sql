Host: mysql-solaitra.alwaysdata.net
User: solaitra
Mdp: solaitra@1234
DB : solaitra_db

create database solaitra_db;
use solaitra_db;

DROP TABLE user;
DROP TABLE token;
DROP TABLE word;
DROP TABLE level_user;
DROP TABLE quizz;
DROP TABLE answer_choice;
DROP TABLE user_answer;
DROP TABLE user_note;

create table user(
    id integer not null AUTO_INCREMENT,
    lastname varchar(100) not null,
    firstname varchar(100),
    sex varchar(10),
    pseudo varchar(20) not null,
    password varchar(100) not null,
    constraint user_pk primary key (id)
)engine=innodb;

create table token(
    id integer not null AUTO_INCREMENT,
    id_user integer not null,
    token varchar(100) not null,
    expiration timestamp not null default now(),
    constraint token_pk primary key (id),
    constraint token_user_fk foreign key (id_user) references user(id)
)engine=innodb;

word (id, name, description, picture)

level_user (id_user , unlocked)

quizz (id, alphabet, question, picture, right_answer)

answer_choice (id, id_quizz, answer_choice)

user_answer (id_user, date, id_quizz, id_answer_choice)

user_note (id, date , note)

