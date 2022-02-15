-- Drops the sample_db if it exists currently --
DROP DATABASE IF EXISTS employee_db;
-- Creates the sample_db database --
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department (
    id INT NOT NULL,
    PRIMARY KEY (id),
    dept_name VARCHAR(30) UNIQUE NOT NULL
);

CREATE TABLE roles (
    id INT NOT NULL,
    PRIMARY KEY (id),
    title VARCHAR(30) UNIQUE NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL,
    INDEX dep_ind (department_id),
    CONSTRAINT fk_department FOREIGN KEY (department_id)
);

CREATE TABLE employee (
    id INT AUTO_INCREMENT,
    PRIMARY KEY (id),
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    INDEX role_ind (role_id),
    CONSTRAINT fk_role FOREIGN KEY (role_id),
    manager_id INT,
    INDEX man_ind (manager_id),
    CONSTRAINT fk_manager FOREIGN KEY (manager_id)
);




