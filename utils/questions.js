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
            "Update Role Salary",
            "Update an Employee",
            "Delete a Department",
            "Delete a Role",
            "Delete an Employee",
            "View Employees by Manager", //todo
            "View Employees by Department", //todo
            "View Total Budget of Department", //todo
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
        message: "Which Department do you wish to Update?",
        choices: choices.departmentList
    },
    {
        type: "input",
        name: "updated_name",
        message: `What is the Updated Name of the Department?`,
        validate: validateAlpha
    }
]

const deleteDepartment = [
    {
        type: "list",
        name: "department_name",
        message: "Which Department do you wish to Delete?",
        choices: choices.departmentList
    },
    {
        type: "confirm",
        name: "confirm",
        message: "Are You Sure?! - This Cannot Be Undone!"
    }
]

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

const updateRole = [
    {
        type: "list",
        name: "role_title",
        message: "Which Role do you wish to Update?",
        choices: choices.roleList
    },
    {
        type: "input",
        name: "updated_salary",
        message: `What is the Updated Salary for this Role?`,
        validate: validateNum
    }
]

const deleteRole = [
    {
        type: "list",
        name: "role_name",
        message: "Which Role do you wish to Delete?",
        choices: choices.roleList
    },
    {
        type: "confirm",
        name: "confirm",
        message: "Are You Sure?! - This Cannot Be Undone!"
    }
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

const updateEmployee = [
    {
        type: "list",
        name: "employee_name",
        message: "Which Employee do you wish to Update?",
        choices: choices.employeeList
    },
    {
        type: "input",
        name: "updated_manager_id",
        message: `What is the Employee's New Manager's ID?`,
        validate: validateNum
    }
]

const deleteEmployee = [
    {
        type: "list",
        name: "employee_name",
        message: "Which Employee do you wish to Delete?",
        choices: choices.employeeList
    },
    {
        type: "confirm",
        name: "confirm",
        message: "Are You Sure?! - This Cannot Be Undone!"
    }
]

const viewEmployeeByManager = [
    {
        type: "list",
        name: "manager_name",
        message: "Which Manager's Employee's Would You Like To View?",
        choices: choices.managerList
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
    updateDepartment,
    deleteDepartment,
    updateRole,
    deleteRole,
    updateEmployee,
    deleteEmployee,
    viewEmployeeByManager
}