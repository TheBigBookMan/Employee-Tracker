const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Summerland!5',
    database: 'employee_tracker'
})

router.get('/', (req, res) => {
    const sql = `SELECT CONCAT(employees.first_name, ' ', employees.last_name) AS Employee,
    roles.id, departments.name AS Department, roles.title AS Role
        FROM roles
        LEFT JOIN employees
        ON employees.role_id = roles.id
        RIGHT JOIN departments
        ON roles.department_id = departments.id
        ORDER BY roles.id ASC;`;
    db.query(sql, (err, rows) => {
        const newDep = rows.map(row => row.Department)
        const newRol = rows.map(row => row.Role)
        const newEmp = rows.map(row => row.Employee)
        res.json({
            message: 'success',
            dataDep: newDep,
            dataRol: newRol,
            dataEmp: newEmp,
        })
    })
})


module.exports = router;