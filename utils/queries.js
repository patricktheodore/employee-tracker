const db = require('../config/connection');
const consoleTable = require('console.table');


const viewDepartments = () => { 
    db.promise().query("SELECT * FROM department;")
    .then(([rows, fields]) => {
        console.table(rows);
        runMainMenu();
    })
    .catch(console.log);
};

const viewRoles = () => { 
    db.promise().query("SELECT * FROM role;")
    .then(([rows, fields]) => {
        console.table(rows);
    })
    .catch(console.log);
};

const viewEmployees = () => { 
    db.promise().query("SELECT * FROM employee;")
    .then(([rows, fields]) => {
        console.table(rows);
    })
    .catch(console.log);
};







module.exports = {
    viewDepartments,
    viewRoles,
    viewEmployees

}