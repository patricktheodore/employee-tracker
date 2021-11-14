const db = require('../config/connection');


const departmentList = async () => {
    
    let departmentListArr = [];

    await db.promise().query('SELECT name FROM department;')
    .then(([rows, fields]) => {
        departmentListArr = rows;
        });

    return departmentListArr;
}

module.exports = { departmentList }