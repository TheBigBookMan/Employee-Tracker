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
    res.send('EMPLOYEE ROUTE WORKED')
})

module.exports = router;