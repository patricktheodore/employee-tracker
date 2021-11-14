const db = require('../config/connection');
const consoleTable = require('console.table');
const chalk = require('chalk');

const readEmployee = async () => { 
    await db.promise().query("SELECT * FROM employee;")
    .then(([rows, fields]) => {
        console.table(rows);
        console.log(chalk.greenBright('------------------' + '\n'));
    })
    .catch(console.log);
};

const createEmployee = async (employee_first_name, employee_last_name, role_id, manager_id) => { 
    db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?, ?)`, [employee_id, employee_first_name, employee_last_name, role_id, manager_id]);
};



module.exports = {
    readEmployee,
    createEmployee

}