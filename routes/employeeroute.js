const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Summerland!5',
    database: 'employee_tracker'
    },
    console.log('Connected to the database.')
);

router.get('/', (req, res) => {
    const sql = `SELECT employees.id AS ID, 
    CONCAT(employees.first_name, ' ', employees.last_name) AS Employee, 
    departments.name AS Department, 
    roles.title AS Role, 
    roles.salary AS Salary, 
    IF(x.id IS NULL, '', CONCAT(x.first_name, ' ', x.last_name)) as 'Manager'
        FROM employees 
        LEFT JOIN employees AS x
        ON x.id = employees.manager_id
        LEFT JOIN roles
        ON employees.role_id = roles.id
        LEFT JOIN departments
        ON roles.department_id = departments.id;`;
    db.query(sql, (err, rows) => {
        res.json({
            message: 'success',
            data: rows
        })
    })
})

// NEED TO GET THE VARIABLES PASSED THROUGH THE REQUEST AND TEMPLATE THEM INTO A SQL QUEWRY THAT IS AN INSERT INTO EMPLOYEES TABLE


router.post('/', (req, res) => {
    console.log(req.body)
    res.send(req.body)
})

module.exports = router;