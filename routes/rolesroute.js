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
    const sql = `SELECT roles.id, roles.title, departments.name, roles.salary 
    FROM roles 
    LEFT JOIN departments 
    ON roles.department_id = departments.id 
    ORDER BY id ASC`;
    db.query(sql, (err, rows) => {
        res.json({
            message: 'success',
            data: rows
        })
    })
})

module.exports = router;