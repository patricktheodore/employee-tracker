const chalk = require('chalk');
const db = require('../config/connection');
const choices = require('./choices');


const mainMenu = [
    {
        type: "list",
        name: "startMenu",
        message: "What would you like to do?",
        choices: [
            "View All Departments",
            "View All Roles",
            "View All Employees",
            "Add a Department",
            "Add a Role",
            "Add an Employee",
            "Update a Department",
            "Update a Role",
            "Update an Employee",
            "Delete a Department",
            "Delete a Role",
            "Delete an Employee",
            "View Employees by Manager", //todo
            "View Employees by Department", //todo
            "View Total Budget of Departments", //todo
            "Exit"
        ],
        default: "View All Departments",
        loop: false,
    },
]

const createDepartment = [
    {
        type: "input",
        name: "department_name",
        message: "What is the name of the New Department?",
        validate: validateAlpha
    },
    {
        type: "input",
        name: "department_id",
        message: "What is the id of this Department?",
        validate: validateNum
    }
]

const updateDepartment = [
    {
        type: "list",
        name: "department_name",
        message: "Which Department do you wish to update?",
        choices: db.query("SELECT name, ARRAY")
    },
    {
        type: "input",
        name: "updated_name",
        message: "What is the updated name of the Department?",
        validate: validateAlpha
    }
]

// const deleteDepartment = [
//     {
//         type: ""
//     }
// ]

const createRole = [
    {
        type: "input",
        name: "role_title",
        message: "What is the Title of the New Role?",
        validate: validateAlpha
    },
    {
        type: "input",
        name: "role_id",
        message: "What is the id of this Role?",
        validate: validateNum
    },
    {
        type: "input",
        name: "role_salary",
        message: "What is the Salary of the New Role? (e.g. 50000)",
        validate: validateNum
    },
    {
        type: "input",
        name: "department_id",
        message: "What is the id of the Department this Role belongs too?",
        validate: validateNum
    },
]

const createEmployee = [
    {
        type: "input",
        name: "employee_first_name",
        message: "What is the Employees First Name?",
        validate: validateAlpha
    },
    {
        type: "input",
        name: "employee_last_name",
        message: "What is the Employees Last Name?",
        validate: validateAlpha
    },
    {
        type: "input",
        name: "role_id",
        message: "What is the id of the Role this Employee belongs too?",
        validate: validateNum
    },
    {
        type: "input",
        name: "manager_id",
        message: "What is the Employee's Managers ID?",
        validate: validateNum
    },
]



function validateNum(userInput) {
    const re = /^[0-9]*$/;
            if (re.test(String(userInput))) {
                return true
            } else {
                return chalk.redBright('MUST BE NUMBERS ONLY!');
            };
};

function validateAlpha(userInput) {
    const re = /^[A-Za-z]+$/;
            if (re.test(String(userInput))) {
                return true
            } else {
                return chalk.redBright('MUST ONLY CONTAIN LETTERS!');
            };
}; 




module.exports = {
    mainMenu,
    createDepartment,
    createRole,
    createEmployee,
    updateDepartment
}