CREATE DATABASE liverpoolfc;
USE liverpoolfc;

CREATE USER 'LfcSupporter'@'localhost' IDENTIFIED BY 'ynwa';
GRANT ALL PRIVILEGES ON liverpoolfc.* TO 'LfcSupporter'@'localhost';
FLUSH PRIVILEGES;

CREATE TABLE players_nation (
  id_p_nat INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
  nation VARCHAR(50) NULL,
  PRIMARY KEY(id_p_nat)
);

CREATE TABLE coaches_nation (
  id_c_nat INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
  nation VARCHAR(50) NULL,
  PRIMARY KEY(id_c_nat)
);

CREATE TABLE playground (
  id_play INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
  playground VARCHAR(50) NULL,
  PRIMARY KEY(id_play)
);

CREATE TABLE coaches (
  id_coaches INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
  id_c_nat INTEGER UNSIGNED NOT NULL,
  firstname VARCHAR(50) NULL,
  lastname VARCHAR(50) NULL,
  currently BOOL NULL,
  PRIMARY KEY(id_coaches),
  FOREIGN KEY(id_c_nat)
    REFERENCES coaches_nation(id_c_nat)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION
);

CREATE TABLE p_positions (
  id_position INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
  id_play INTEGER UNSIGNED NOT NULL,
  p_position VARCHAR(50) NULL,
  PRIMARY KEY(id_position),
  FOREIGN KEY(id_play)
    REFERENCES playground(id_play)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION
);

CREATE TABLE players (
  id_player INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
  id_position INTEGER UNSIGNED NOT NULL,
  p_name VARCHAR(50) NULL,
  p_lastname VARCHAR(50) NULL,
  p_number SMALLINT UNSIGNED NULL,
  stronger_foot BOOL NULL,
  nation INTEGER UNSIGNED NOT NULL,
  who_buy INTEGER UNSIGNED NOT NULL,
  PRIMARY KEY(id_player),
  FOREIGN KEY(id_position)
    REFERENCES p_positions(id_position)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION,
  FOREIGN KEY(who_buy)
    REFERENCES coaches(id_coaches)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION,
  FOREIGN KEY(nation)
    REFERENCES players_nation(id_p_nat)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION
);

INSERT INTO players_nation VALUES 
(default, 'Germans'),
(default, 'Dutch'),
(default, 'English'),
(default, 'Croatians'),
(default, 'Brazilians'),
(default, 'Estonians'),
(default, 'Spaniards'),
(default, 'Egyptians'),
(default, 'Senegalese'),
(default, 'Belgians'),
(default, 'Scots'),
(default, 'Cameroonians'),
(default, 'Hungarians'),
(default, 'Welsh');

INSERT INTO coaches_nation VALUES 
(default, 'Germans'),
(default, 'Irish'),
(default, 'Scots'),
(default, 'English'),
(default, 'Spaniards');

INSERT INTO playground VALUES 
(default, 'Goal Keeper'),
(default, 'Defence'),
(default, 'Middlefield'),
(default, 'Forward');

INSERT INTO coaches VALUES
(default, 1, 'Jurgen', 'Klopp', 1),
(default, 2, 'Brendan', 'Rodgers', 0),
(default, 3, 'Kenny', 'Dalglish', 0),
(default, 4, 'Roy', 'Hodgson', 0),
(default, 5, 'Rafa', 'Benitez', 0);

SELECT * FROM coaches;

INSERT INTO p_positions VALUES
(default, 1, 'Goalkeeper'),
(default, 2, 'Centre-back'),
(default, 2, 'Left full-back'),
(default, 2, 'Right full-back'),
(default, 2, 'Left wing-back'),
(default, 2, 'Right wing-back'),
(default, 3, 'Defensive midfield'),
(default, 3, 'Centre midfield'),
(default, 3, 'Attacking midfield'),
(default, 3, 'Left midfield'),
(default, 3, 'Right midfield'),
(default, 4, 'Centre forward'),
(default, 4, 'Second striker'),
(default, 4, 'Left winger'),
(default, 4, 'Right winger');
    
INSERT INTO players VALUES
-- id position  fname  lname number foot nationality whobuy
(default, 1 , 'Loris', 'Karius', 1, 1, 1, 1),
(default, 4 , 'Nathaniel', 'Clyne', 2, 1, 3, 2),
(default, 2 , 'Virgil', 'Van Dijk', 4, 1, 2, 1),
(default, 8 , 'Georginio', 'Wijnaldum', 5, 1, 2, 1),
(default, 2 , 'Dejan', 'Lovren', 6, 1, 4, 2),
(default, 8 , 'James', 'Milner', 7, 1, 3, 2),
(default, 13 , 'Roberto', 'Firmino', 9, 1, 5, 2),
(default, 15 , 'Mohamed', 'Salah', 11, 0, 8, 1),
(default, 2 , 'Joe', 'Gomez', 12, 1, 3, 2),
(default, 7 , 'Jordan', 'Henderson', 14, 1, 3, 3),
(default, 2 , 'Ragnar', 'Klavan', 17, 1, 7, 1),
(default, 3 , 'Alberto', 'Moreno', 18, 0, 7, 2),
(default, 14 , 'Sadio', 'Mane', 19, 1, 9, 1),
(default, 9 , 'Adam', 'Lallana', 20, 1, 3, 2),
(default, 9 , 'Alex', 'Oxlade-Chamberlain', 21, 1, 3, 1),
(default, 1 , 'Simon', 'Mignolet', 22, 1, 10, 2),
(default, 7 , 'Emre', 'Can', 23, 1, 1, 2),
(default, 3 , 'Andy', 'Robertson', 26, 0, 11, 1),
(default, 12 , 'Danny', 'Ings', 28, 1, 3, 2),
(default, 12 , 'Dominic', 'Solanke', 29, 1, 3, 1),
(default, 2 , 'Joel', 'Matip', 32, 1, 12, 1),
(default, 1 , 'Adam', 'Bogdan', 34, 1, 13, 2),
(default, 1 , 'Danny', 'Ward', 52, 1, 14, 1),
(default, 10 , 'Ben', 'Woodburn', 58, 1, 3, 1),
(default, 4 , 'Trent', 'Alexander-Arnold', 66, 1, 3, 1);

CREATE TABLE lfc_users (
	user_id INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    username VARCHAR(50),
    password VARCHAR(50),
    PRIMARY KEY(user_id)
);

INSERT INTO lfc_users VALUES
(default, 'LfcSupporter', 'ynwa');

SELECT * FROM mysql.user;