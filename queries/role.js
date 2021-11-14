const db = require('../config/connection');
const consoleTable = require('console.table');
const chalk = require('chalk');

const readRole = async () => { 
    await db.promise().query("SELECT * FROM role;")
    .then(([rows, fields]) => {
        console.table(rows);
        console.log(chalk.greenBright('------------------' + '\n'));
    })
    .catch(console.log);
};

const createRole = async (role_id, role_title, role_salary, department_id) => { 
    db.query(`INSERT INTO role (id, name, salary, department_id) VALUES (?, ?, ?, ?)`, [role_id, role_title, role_salary, department_id]);
    console.log(chalk.greenBright('\n' + 'Added - New Role: ' + role_title + ', ID: ' + role_id + ', Salary: $' + role_salary + '\n'));
};

const updateRole = async (role_title, updated_salary) => {
    db.query(`UPDATE role SET salary = (?) WHERE name = (?)`, [updated_salary, role_title]);
    console.log(chalk.greenBright('\n' + 'Updated ' + role_title + "'s Salary: $" + updated_salary + '\n'));
}

const deleteRole = async (role_name) => {
    db.query(`DELETE FROM role WHERE name = (?)`, [role_name]);
}


module.exports = {
    readRole,
    createRole,
    updateRole,
    deleteRole
}