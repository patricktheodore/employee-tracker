const departmentQ = require('../queries/department')
const db = require('../config/connection');


const departmentList = async () => {

    const departmentListArr = [];

    await db.promise().query('SELECT name FROM department;')
    .then(([rows, fields]) => {
        console.log(rows)
        departmentListArr.push(rows);
        });
    
        return departmentListArr;
}

module.exports = { departmentList }