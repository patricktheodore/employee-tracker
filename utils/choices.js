const departmentQ = require('../queries/department')
const db = require('../config/connection');


const departmentList = async () => {

    const departmentListArr = [];

    await db.promise().query('SELECT name FROM department')
    .then(([rows]) => {
        console.log(rows)
        });
    return departmentListArr;
}

module.exports = { departmentList }