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
    db.query(`INSERT INTO role (id, title, salary, department_id) VALUES (?, ?, ?, ?)`, [role_id, role_title, role_salary, department_id]);
};

module.exports = {
    readRole,
    createRole,
}