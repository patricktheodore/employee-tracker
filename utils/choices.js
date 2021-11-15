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
    
    let employeeListArr = [];
    let employeeNameList = [];
    
    await db.promise().query("SELECT * FROM employee;")
    .then(([rows, fields]) => {
    employeeListArr = rows;
    }).catch(console.log);

    employeeListArr.forEach(employee => {
        let nameObj = {
            name: employee.first_name + ' ' + employee.last_name,
            id: employee.id
        }
        employeeNameList.push(nameObj);
    });

    return employeeNameList;
};

const managerList = async () => {
    
    let managerListArr = [];
    let managerNameList = [];
    
    await db.promise().query("SELECT * FROM employee WHERE manager_id IS NULL;")
    .then(([rows, fields]) => {
    managerListArr = rows;
    }).catch(console.log);

    managerListArr.forEach(manager => {
        let nameObj = {
            name: manager.first_name + ' ' + manager.last_name,
            id: manager.id
        }
        managerNameList.push(nameObj);
    });

    return managerNameList;
};


module.exports = { departmentList, roleList, employeeList, managerList }