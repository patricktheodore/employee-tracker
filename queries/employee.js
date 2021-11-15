const db = require('../config/connection');
const consoleTable = require('console.table');
const chalk = require('chalk');
const choices = require('../utils/choices');

const readEmployee = async () => { 
    await db.promise().query("SELECT * FROM employee;")
    .then(([rows, fields]) => {
        console.table(rows);
        console.log(chalk.greenBright('------------------' + '\n'));
    })
    .catch(console.log);
};

const createEmployee = async (employee_first_name, employee_last_name, role_id, manager_id) => { 
    db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`, [employee_first_name, employee_last_name, role_id, manager_id]);
};

const deleteEmployee = async (employee_name) => {

    const employeeListArr = await choices.employeeList();
    const employeeToDelete = employeeListArr.filter(employee => employee.name === employee_name);
    const employeeToDeleteId = employeeToDelete[0].id;

    db.query(`DELETE FROM employee WHERE id = (?)`, [employeeToDeleteId]);
}

const updateEmployee = async (employee_name, updated_manager_id) => {
    
    const employeeListArr = await choices.employeeList();
    const employeeToUpdate = employeeListArr.filter(employee => employee.name === employee_name);
    const employeeToUpdateId = employeeToUpdate[0].id;
    
    db.query(`UPDATE employee SET manager_id = (?) WHERE id = (?)`, [updated_manager_id, employeeToUpdateId]);
    console.log(chalk.greenBright('\n' + `Updated ${employee_name}'s Manager: ` + `${updated_manager_id}!` + '\n'));

}

const viewManagers = async () => {
    await db.promise().query("SELECT id, first_name, last_name FROM employee WHERE manager_id IS NULL;")
    .then(([rows, fields]) => {
        console.table(rows);
        console.log(chalk.greenBright('------------------' + '\n'));
    })
    .catch(console.log);}

const viewEmployeeByManager = async (manager_name) => { 
    const managerListArr = await choices.managerList();
    const managerToView = managerListArr.filter(manager => manager.name === manager_name);
    const managerId = managerToView[0].id;

    await db.promise().query('SELECT id, first_name, last_name, role_id FROM employee WHERE manager_id = (?)', [managerId])
    .then(([rows, fields]) => {
        console.log(chalk.greenBright('------------------' + '\n'));
        console.table(rows);
        console.log(chalk.greenBright('------------------' + '\n'));
    })
    .catch(console.log);
};

module.exports = {
    readEmployee,
    createEmployee,
    updateEmployee,
    deleteEmployee,
    viewManagers,
    viewEmployeeByManager
}