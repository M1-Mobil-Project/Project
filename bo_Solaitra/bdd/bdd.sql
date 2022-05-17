Accès projet
url: 
login: 
mot de passe: 

create database solaitra;
use solaitra;

DROP TABLE token;
DROP TABLE user;

create table user(
    id integer not null AUTO_INCREMENT,
    name varchar(100) not null,
    firstname varchar(100),
    sexe varchar(10) not null,
    login varchar(20) not null,
    constraint user_pk primary key (id)
)engine=innodb;

create table token(
    id integer not null AUTO_INCREMENT,
    id_user integer not null,
    token varchar(100) not null,
    expiration timestamp not null,
    constraint token_pk primary key (id),
    constraint token_user_fk foreign key (id_user) references user(id)
)engine=innodb;
