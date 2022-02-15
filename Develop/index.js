const fs = require('fs');
const path  = require('path');
const mysql = require('mysql2');
const inquirer = require('inquirer');
const db = require('./main/db/connection.js');

// present user with options


db.query('SELECT * FROM employee_db')
    .then((results) => {
    // console.log(results);
    console.log(err);
}

//VIEWS - READ
//view all departments - READ - "SELECT * FROM table_name"
async function viewAllDepartments (){
    const departments = await db.query('SELECT * FROM department');
    console.table(departments)
}


//view all roles - READ - "SELECT * FROM table_name"
async function viewRoles (){
    const roles = await db.query('SELECT * FROM roles');
    console.table(roles)
}

//view all employees - READ - "SELECT * FROM table_name"
async function viewEmployees (){
    const employees = await db.query('SELECT * FROM employee_db');
    console.table(employees)

}

//ADDS - CREATE
//add a department - CREATE - "INSERT INTO table_name (col, col2) VALUES (value, value2)"


//add a role - CREATE - "INSERT INTO table_name (col, col2) VALUES (value, value2)"
 


        //TAKE users answers and INSERT them into role table

async function createRole () {
            //SELECT the existing roles out of 'roles' table
    const departments = [
        {
            id: 1,
            name: "Sales",
        },
        {
            id: 2,
            name: "Accounting"
        }
        ];
            //.map the results from 'roles' to question data for inquirer   
    const choices = departments.map(department => {
        return {
                name: department.name,
                value: department.id,
                }
    });


                //THEN prompt the user for role information (inquirer)
    const answers = await inquirer
        .prompt([
            {
                type:"list",
                name:"department_id",
                message:"Choose a department:",
                 choices: choices,
             }
        ])
        .then((answers)=> {
            console.log(answers)
        })
}


//add an employee - CREATE - "INSERT INTO table_name (col, col2) VALUES (value, value2)"


//UPDATES
//update an employee and their details
