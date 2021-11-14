const db = require('../config/connection');
const consoleTable = require('console.table');
const chalk = require('chalk');

const createDepartment = async (department_id, department_name) => { 
    db.query(`INSERT INTO department (id, name) VALUES (?, ?)`, [department_id, department_name]);
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
}

const deleteDepartment = async (department_id) => {
    db.query(`DELETE FROM department WHERE id = (?)`, [department_id]);
}

//delete - show departments. ask for id of dep to delete. ask if user is sure? then delete. 



module.exports = {
    createDepartment,
    readDepartment,
    updateDepartment,
    deleteDepartment
}

