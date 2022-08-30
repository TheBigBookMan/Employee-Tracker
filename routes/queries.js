const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Summerland!5',
    database: 'employee_tracker'
})

// NEED TO GET THE MANAGERS ID IN HERE AS WELL

router.get('/', (req, res) => {
    const sql = `SELECT departments.name AS Department, roles.title AS Role
    FROM roles
    RIGHT JOIN departments
    ON roles.department_id = departments.id`;
    db.query(sql, (err, rows) => {
        const newDep = rows.map(row => row.Department)
        const newRol = rows.map(row => row.Role)
        res.json({
            message: 'success',
            dataDep: newDep,
            dataRol: newRol
        })
    })
})

// try to get this array to main place and get it updated everyime theres a new entry
module.exports = router;