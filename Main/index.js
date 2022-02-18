const fs = require('fs');
const path  = require('path');
const mysql = require('mysql2');
const inquirer = require('inquirer');
const db = require('./db/connection');

// present user with options


// db.query('SELECT * FROM employee_db')
//     .then((results) => {
//     console.log(results);
//     console.log(err);
// })
nextAction();


function nextAction() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to do in the database?',
            choices: ['VIEW Roles', 'ADD a Role', 'DELETE a Role', 'VIEW Departments', 'VIEW a Department', 'DELETE a Department', 'VIEW Employees', 'ADD an Employee', 'UPDATE Employee Role', 'DELETE an Employee']
        }
    ])
    .then(res => {
        switch(res.action) {
            case 'VIEW Roles':
                viewRoles();
                break;
            case 'ADD a Role':
                createRole();
                break;
            case 'VIEW Departments':
                viewAllDepartments();
                break;
            case 'ADD a Department':
                createDepartment();
                break;
            case 'VIEW Employees':
                viewAllEmployees();
                break;
            case 'ADD an Employee':
                createEmployees();
                break;
            case 'UPDATE Employee Role':
                updateEmployee();
                break;
            case 'Exit':
                exitApp();
            default:
                process.exit();
        }
    })
}

//VIEWS - READ
//view all departments - READ - "SELECT * FROM table_name"
async function viewAllDepartments (){
    const departments = await db.query('SELECT * FROM department');
    console.table(departments)
}


//view all roles - READ - "SELECT * FROM table_name"
async function viewRoles (){
    const roles = await db.query('SELECT * FROM role');
    console.table(roles)
}

//view all employees - READ - "SELECT * FROM table_name"
async function viewEmployees (){
    const employees = await db.query('SELECT * FROM employee_db');
    console.table(employees)

}

//ADDS - CREATE
//add a department - CREATE - "INSERT INTO table_name (col, col2) VALUES (value, value2)"
async function createDepartment () {
    await inquirer.prompt([
        {
            type: 'input',
            name: 'department_name',
            message: "Enter Department Name:",
        },
    ])
    .then((answer) => {
        let departmentList = ('INSERT INTO department (department_name) VALUES (?)');
        db.query(departmentList, answer.department_name, (err, res) => {
            if (err) throw err;
            console.log(
                "New Department Added!"
            )
        })
    })
}

//add a role - CREATE - "INSERT INTO table_name (col, col2) VALUES (value, value2)"
 
        //TAKE users answers and INSERT them into role table

async function createRole () {

    const departments = ('SELECT * FROM department');
    const choices = departments.map(department => {
            return {
                    name: department.name,
                    value: department.id,
                    }
    })
   const role = await inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'Enter job title:'
        },
        {
            type: 'number',
            name: 'pay',
            message: 'Enter job salary:'
        },
        {
            type:"list",
            name:"department_id",
            message:"Choose a department:",
            choices: choices,
         }
    ])
        // const roleAnswers = [answer.title, answer.pay];
        db.createRole(role);
        const {title} = role;
        console.log(`${title} has been added.`)
}

//add an employee - CREATE - "INSERT INTO table_name (col, col2) VALUES (value, value2)"


//UPDATES
//update an employee and their details
