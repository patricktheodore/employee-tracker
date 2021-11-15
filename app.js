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
    });
    runMainMenu();
};

const readDepartment = async () => {
    await department.readDepartment();
    runMainMenu();
};

const updateDepartment = async () => {
    await inquirer.prompt(questions.updateDepartment).then((response) => {
        department.updateDepartment(response.updated_name, response.department_name);
    })
    runMainMenu();
};

const deleteDepartment = async () => {
    await inquirer.prompt(questions.deleteDepartment).then((response) => {
        if (response.confirm) {
            department.deleteDepartment(response.department_name);
            console.log(chalk.redBright('\n' + 'Deleted Department: ' + response.department_name + '\n'));
        } else {
            console.log(chalk.redBright('\n' + 'ABORTED!'+ '\n'));
        }
    });
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
    });
    runMainMenu();
};

const updateRole = async () => {
    await inquirer.prompt(questions.updateRole).then((response) => {
        role.updateRole(response.role_title, response.updated_salary);
    })
    runMainMenu();
};

const deleteRole = async () => {
    await inquirer.prompt(questions.deleteRole).then((response) => {
        if (response.confirm) {
            role.deleteRole(response.role_name);
            console.log(chalk.redBright('\n' + 'Deleted Role: ' + response.role_name + '\n'));
        } else {
            console.log(chalk.redBright('\n' + 'ABORTED!'+ '\n'));
        }
    });
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

const updateEmployee = async () => { 
    await inquirer.prompt(questions.updateEmployee).then(async (response) => {
        await employee.updateEmployee(response.employee_name, response.updated_manager_id);
        runMainMenu();
    })
};

const deleteEmployee = async () => {
    await inquirer.prompt(questions.deleteEmployee).then((response) => {
        if (response.confirm) {
            employee.deleteEmployee(response.employee_name);
            console.log(chalk.redBright('\n' + 'Deleted Employee: ' + response.employee_name + '\n'));
        } else {
            console.log(chalk.redBright('\n' + 'ABORTED!'+ '\n'));
        }
    });
    runMainMenu();
};

const viewEmployeeByManager = async () => {
    await employee.viewManagers();
    await inquirer.prompt(questions.viewEmployeeByManager).then(async (response) => {
            await employee.viewEmployeeByManager(response.manager_name);
            runMainMenu();
    });
};

const viewEmployeesByDepartment = async () => {
    await inquirer.prompt(questions.viewEmployeesByDepartment).then(async (response) => {
        await department.viewEmployeesByDepartment(response.department_name);
        runMainMenu();
    })
};

const viewDepartmentBudget = async () => {
    await inquirer.prompt(questions.viewDepartmentBudget).then(async (response) => {
        await department.viewDepartmentBudget(response.department_name);
        runMainMenu();
    })
};


//operations
const operations = new Map();

operations.set("View All Departments", readDepartment)
.set("Add a Department", createDepartment)
.set("Update a Department", updateDepartment)
.set("Delete a Department", deleteDepartment)
.set("View All Roles", readRole)
.set("Add a Role", createRole)
.set("Update Role Salary", updateRole)
.set("Delete a Role", deleteRole)
.set("View All Employees", readEmployee)
.set("Add an Employee", createEmployee)
.set("Update an Employee", updateEmployee)
.set("Delete an Employee", deleteEmployee)
.set("View Employees by Manager", viewEmployeeByManager)
.set("View Employees by Department", viewEmployeesByDepartment)
.set("View Total Budget of Department", viewDepartmentBudget)
.set("Exit", runExit);



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
    return
}

function init() {
    console.log(chalk.blueBright('\n\n\n\n' + 'Welcome to Workplace Employee Tracker!' + '\n\n\n\n'));
    runMainMenu();
}

init();