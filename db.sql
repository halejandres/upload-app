CREATE DATABASE archivos;

USE archivos;

CREATE TABLE file(
	id INT AUTO_INCREMENT,
    name VARCHAR(100),
    size DOUBLE,
    mimetype VARCHAR(100),
    data MEDIUMBLOB,
    PRIMARY KEY(id)
)


