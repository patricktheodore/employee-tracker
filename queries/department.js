const db = require('../config/connection');
const consoleTable = require('console.table');
const chalk = require('chalk');

const createDepartment = async (department_id, department_name) => { 
    db.query(`INSERT INTO department (id, name) VALUES (?, ?)`, [department_id, department_name]);
    console.log(chalk.greenBright('\n' + 'Added - New Department: ' + department_name + ', ID: ' + department_id + '\n'));
};

const readDepartment = async () => { 
    await db.promise().query("SELECT * FROM department;")
    .then(([rows, fields]) => {
        console.table(rows);
        console.log(chalk.greenBright('------------------' + '\n'));
    })
    .catch(console.log);
};

const updateDepartment = async (updated_name, department_name) => {
    db.query(`UPDATE department SET name = (?) WHERE name = (?)`, [updated_name, department_name]);
    console.log(chalk.greenBright('\n' + 'Updated Department: ' + department_name + ' - ' + updated_name + '\n'));

}

const deleteDepartment = async (department_name) => {
    db.query(`DELETE FROM department WHERE name = (?)`, [department_name]);
}

module.exports = {
    createDepartment,
    readDepartment,
    updateDepartment,
    deleteDepartment
}

