const departmentQ = require('../queries/department')
const db = require('../config/connection');


const departmentList = async () => {

    const departmentListArr = []

    await db.promise().query('SELECT name FROM department')
    .then(([rows]) => {
        rows.forEach(name => {
            departmentListArr.push(name)
        })
    });

    return departmentListArr;
}

module.exports = { departmentList }