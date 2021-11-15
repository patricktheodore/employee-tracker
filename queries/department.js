const db = require('../config/connection');
const consoleTable = require('console.table');
const chalk = require('chalk');
const choices = require('../utils/choices');

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

const viewEmployeesByDepartment = async (department_name) => {
    const departmentListArr = await choices.departmentListObj();
    const departmentToView = departmentListArr.filter(department => department.name === department_name);
    const departmentId = departmentToView[0].id;

    await db.promise().query(`SELECT CONCAT(employee.first_name, ' ', employee.last_name) AS 'Name', department.name AS 'Department' 
    FROM employee 
    INNER JOIN role ON employee.role_id = role.id
    INNER JOIN department ON role.id = department.id
    WHERE department.id = (?)`, [departmentId])
        .then(([rows, fields]) => {
            console.log(chalk.greenBright('------------------' + '\n'));
            console.table(rows);
            console.log(chalk.greenBright('------------------' + '\n'));
        })
        .catch(console.log);
};

const viewDepartmentBudget = async (department_name) => {
    
    await db.promise().query(`SELECT department.name AS 'Department', SUM(role.salary) AS Budget FROM role 
    INNER JOIN department ON role.department_id = department.id
    WHERE department.name = (?)`, [department_name])
    .then(([rows, fields]) => {
        console.log(chalk.greenBright('------------------' + '\n'));
        console.table(rows);
        console.log(chalk.greenBright('------------------' + '\n'));
    })
    .catch(console.log);
};

module.exports = {
    createDepartment,
    readDepartment,
    updateDepartment,
    deleteDepartment,
    viewEmployeesByDepartment,
    viewDepartmentBudget
}

