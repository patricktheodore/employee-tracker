const inquirer = require('inquirer');
const chalk = require('chalk');
const db = require('./config/connection');


const questions = require('./utils/questions');
const queries = require('./utils/queries');

const runMainMenu = async () => {
    await inquirer.prompt(questions.mainMenu)
        .then((response) => {
            let answer = response.startMenu;
            console.log(chalk.greenBright('\n' + '-----' + '\n'));
            switch (answer) {
                case "View All Departments": viewDepartments();
                    break;
                case "View All Roles": viewRoles();
                    break;
                case "View All Employees": viewEmployees();
                    break;
                case "Add a Departments": addDepartment();
                    break;
                case "Add a Role": addRole();
                    break;
                case "Add an Employee": addEmployee();
                    break;
                case "Update an Employee Role": updateEmployee();
                    break;
                case "Exit": runExit();
                    break;
            }
        });
};


const viewDepartments = () => { 
    db.promise().query("SELECT * FROM department;")
    .then(([rows, fields]) => {
        console.table(rows);
        runMainMenu();
    })
    .catch(console.log);
};

const viewRoles = () => { 
    db.promise().query("SELECT * FROM role;")
    .then(([rows, fields]) => {
        console.table(rows);
        runMainMenu();
    })
    .catch(console.log);
};

const viewEmployees = () => { 
    db.promise().query("SELECT * FROM employee;")
    .then(([rows, fields]) => {
        console.table(rows);
        runMainMenu();
    })
    .catch(console.log);
};






//connect using mysql2 package

//use mysql2 promises

//inquirer to interact with the user

//console.table package to print mysql rows to the console. 

//need 3 tables, department, role, employee

//view all departments - formatted table showing department names and departments ids

//view all roles -job title, role id, the departments the role belongs to, and the salary for that role

//view all employees - employee data, employee id, firrst name, last name, job title, departments, ssalaries, manager employee reports too

//add department - prompted for name of department, that department added to db

//add role - prompted for name, salary, department and then added to db

//add employee - prompted first name, last name, role and manager, then added to db

//update employee - prompted to select employee and update their new role and update the db. 
function runExit() {
    console.log(chalk.redBright('Thank you for using Workplace Employee Tracker!' + '\n' + 'Goodbye!'));

}

function init() {
    console.log(chalk.blueBright('Welcome to Workplace Employee Tracker!'));
    runMainMenu();
}

init();