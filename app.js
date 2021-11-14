const inquirer = require('inquirer');
const chalk = require('chalk');
const db = require('./config/connection');
const consoleTable = require('console.table');

const questions = require('./utils/questions');
const department = require('./queries/department');
const role = require('./queries/role');
const employee = require('./queries/employee');

//department handling
const createDepartment = async () => {
    await inquirer.prompt(questions.createDepartment).then((response) => {
        department.createDepartment(response.department_id, response.department_name);
        console.log(chalk.greenBright('\n' + 'Added - New Department: ' + response.department_name + ', ID: ' + response.department_id + '\n'));
    });
    runMainMenu();
};

const readDepartment = async () => {
    await department.readDepartment();
    runMainMenu();
};

const updateDepartment = async () => {
    await department.readDepartment();
    await inquirer.prompt(questions.updateDepartment).then((response) => {
        department.updateDepartment(response.updated_name, response.department_name);
        console.log(chalk.greenBright('\n' + 'Updated Department - ' + response.updated_name + '\n'));
    })
    runMainMenu();
};

const deleteDepartment = async () => { //todo
    await department.readDepartment();

    
    
    await department.deleteDepartment();
    runMainMenu();
};

//role handling
const readRole = async () => {
    await role.readRole();
    runMainMenu();
};

const createRole = async () => {
    await inquirer.prompt(questions.createRole).then((response) => {
        role.createRole(response.role_id, response.role_title, response.role_salary, response.department_id);
        console.log(chalk.greenBright('\n' + 'Added - New Role: ' + response.role_title + ', ID: ' + response.role_id + ', Salary: ' + response.role_salary + '\n'));
    });
    runMainMenu();
};

const updateRole = async () => { //todo
    await role.updateRole();
    runMainMenu();
};

const deleteRole = async () => { //todo
    await role.deleteRole();
    runMainMenu();
};

//employee handling
const readEmployee = async () => {
    await employee.readEmployee();
    runMainMenu();
};

const createEmployee = async () => {
    await inquirer.prompt(questions.createEmployee).then((response) => {
        employee.createEmployee(response.employee_first_name, response.employee_last_name, response.role_id, response.manager_id);
        console.log(chalk.greenBright('\n' + 'Added - New Employee: ' + response.employee_first_name + ' ' + response.employee_last_name + '\n'));
    });
    runMainMenu();
};

const updateEmployee = async () => { //todo
    await employee.updateEmployee();
    runMainMenu();
};

const deleteEmployee = async () => { //todo
    await employee.deleteEmployee();
    runMainMenu();
};


//operations
const operations = new Map();

operations.set("View All Departments", readDepartment);
operations.set("Add a Department", createDepartment);
operations.set("Update a Department", updateDepartment);
operations.set("Remove a Department", deleteDepartment);

operations.set("View All Roles", readRole);
operations.set("Add a Role", createRole);
operations.set("Update a Role", updateRole);
operations.set("Delete a Role", deleteRole);

operations.set("View All Employees", readEmployee);
operations.set("Add an Employee", createEmployee);
operations.set("Update an Employees", updateEmployee);
operations.set("Delete an Employee", deleteEmployee);

operations.set("Exit", runExit);



const runMainMenu = async () => {
    await inquirer.prompt(questions.mainMenu)
        .then((response) => {
            let answer = response.startMenu;
            console.log(chalk.greenBright('\n' + '------------------' + '\n'));
            operations.get(answer)();
        });
};

function runExit() {
    console.log(chalk.redBright('Thank you for using Workplace Employee Tracker!' + '\n' + 'Goodbye!'));

}

function init() {
    console.log(chalk.blueBright('Welcome to Workplace Employee Tracker!'));
    runMainMenu();
}

init();
