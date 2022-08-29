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
    const sql = `SELECT employees.id AS ID, CONCAT(employees.first_name, ' ', employees.last_name) AS Employee, departments.name AS Department, roles.title AS Role, roles.salary AS Salary, x.first_name AS manager
    FROM employees 
    LEFT JOIN employees AS x
    ON employees.id = x.manager_id
    LEFT JOIN roles
    ON employees.role_id = roles.id
    LEFT JOIN departments
    ON roles.department_id = departments.id;`
})

module.exports = router;