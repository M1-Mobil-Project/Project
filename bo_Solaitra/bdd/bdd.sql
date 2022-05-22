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

create table level_user(
    id integer not null AUTO_INCREMENT primary key,
    id_user integer not null,
    unlocked integer not null default 1,
    constraint level_user_fk foreign key (id_user) references user(id)
)engine=innodb;

word (id, name, description, picture)

level_user (id_user , unlocked)

quizz (id, alphabet, question, picture, right_answer)

answer_choice (id, id_quizz, answer_choice)

user_answer (id_user, date, id_quizz, id_answer_choice)

user_note (id, date , note)

create table word(
    id integer not null AUTO_INCREMENT primary key,
    name varchar(150) not null,
    description text,
    picture varchar(300),
    alphabet integer
)engine=innodb;


insert into user (lastname, firstname, sex, pseudo, password) values ('Rakoto', 'Kevin', 'M', 'Kevin',sha1('123456'));

insert into level_user(id_user) values (1);

insert into word ( name, alphabet) values 
( 'arbre' , 1) ,
( 'armoire' , 1),
( 'arc en ciel' , 1 ),
( 'algue' , 1),
( 'avion' , 1);

insert into word ( name, alphabet) values 
( 'baleine' , 2) ,
( 'bougie' , 2),
( 'ballon' , 2 ),
( 'boîte' , 2),
( 'bicyclette' , 2),
( 'brosse' , 2);

