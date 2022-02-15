// present user with options


//VIEWS - READ
//view all departments - READ - "SELECT * FROM table_name"


//view all roles - READ - "SELECT * FROM table_name"


//view all employees - READ - "SELECT * FROM table_name"


//ADDS - CREATE
//add a department - CREATE - "INSERT INTO table_name (col, col2) VALUES (value, value2)"


//add a role - CREATE - "INSERT INTO table_name (col, col2) VALUES (value, value2)"
    //SELECT the existing roles out of 'roles' table
    //.map the results from 'roles' to question data for inquirer
    //THEN prompt the user for role information (inquirer)
        //TAKE users answers and INSERT them into role table


//add an employee - CREATE - "INSERT INTO table_name (col, col2) VALUES (value, value2)"


//UPDATES
//update an employee and their details






const inquirer = require('inquirer');

const Manager = require('./lib/manager');
const Intern = require('./lib/intern');
const Engineer = require('./lib/engineer');
const Employee = require('./lib/employee')
const fs = require('fs');
const path  = require('path')

const pageTemplate = require('./src/page-template');

const PORT = 3001;
const employees = [];


var questions = [

    {
        name: "name",
        message: "Name:",
        type: "input",
    },
    {
        name: "ID",
        message: "ID:",
        type: "input",
    },
    {
        name: "email",
        message: "Email:",
        type: "input",
        validate: function(email)
        {
            // Regex mail check (return true if valid email format)
            return /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/.test(email);
        }
    }];

var managerQuestions = [
    {
        name: "officeNumber",
        message: "What is the manager's office number?",
        type: "input",
    }
]

var internQuestion = [
    {
        name: "school",
        message: "What is the intern's school?",
        type: "input",
    }
]

var engineerQuestion = [
    {
        name: "gitHub",
        message: "What is the engineer's GitHub?",
        type: "input",
    }
]

var nextEmployee = [
    {
        name: "role",
        message: "What type of team member would you like to add?",
        type: "list",
        choices: ["Engineer", "Intern", "None at this time"]
    }
]


function init() {
     questions = questions.concat(managerQuestions)
inquirer
    .prompt(questions)
    .then((answers) => {
        employees.push(new Manager(answers.name, answers.ID, answers.email, answers.officeNumber));
        nextAction()
});
}



function genEng() {
    questions  = questions.concat(engineerQuestion);
    inquirer
        .prompt(questions)
        .then((answers) => {
            employees.push(new Engineer(answers.name, answers.ID, answers.email, answers.gitHub));

            nextAction();
});
}


function genIntern() {
    questions  = questions.concat(internQuestion);
    inquirer
        .prompt(questions)
        .then((answers) => {
            employees.push(new Intern(answers.name, answers.ID, answers.email, answers.school));

            nextAction();
});
}

function nextAction() {
    questions = questions.filter((element, index) => index < questions.length - 1)
    inquirer.prompt(nextEmployee)
    .then((answers) => {
        switch (answers.role) {
            case 'Engineer':
                genEng();
                break;
            case 'Intern': 
                genIntern();
                break;
            default:
                buildTemplate()
        }
    })
}

function buildTemplate() {
    if(!fs.existsSync(path.resolve(__dirname, 'dist'))) {
        fs.mkdirSync(path.resolve(__dirname, 'dist'))
    }

    fs.writeFileSync(path.join(path.resolve(__dirname, 'dist'), 'team.html'),pageTemplate(employees), 'utf-8')
}

init();