const db = require('../config/connection');


const departmentList = async () => {
    
    let departmentListArr = [];

    await db.promise().query('SELECT name FROM department;')
    .then(([rows, fields]) => {
        departmentListArr = rows;
        });

    return departmentListArr;
}

const roleList = async () => {
    
    let roleListArr = [];

    await db.promise().query('SELECT name FROM role;')
    .then(([rows, fields]) => {
        roleListArr = rows;
        });

    return roleListArr;
}

const employeeList = async () => {
    
    let allArr = db.promise('SELECT * FROM employee;');

    const choices = allArr[0];

    let employeeListArr = [];

    choices.forEach(element => {
        let nameObj = {
            name: element.first_name + ' ' + element,last_name,
            value: element.id
        }
        employeeListArr.push(nameObj);
    })

    return employeeListArr;
}



module.exports = { departmentList, roleList, employeeList }