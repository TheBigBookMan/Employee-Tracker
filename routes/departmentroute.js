const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Summerland!5',
    database: 'employee_tracker'
    }, 
    console.log("Departments route connected to the database.")
);

router.get('/', (req, res) => {
    const sql = `SELECT * FROM departments`;
    db.query(sql, (err, rows) => {
        res.json({
            message: 'success',
            data: rows
        })
    })
})

router.post('/', (req, res) => {
    const {newDepartment} = req.body
    const sql = `INSERT INTO departments(name)
    VALUES (?);`
    db.query(sql, newDepartment, (err, result) => {
        if(err) {
            res.status(400).json({error: err.message});
            return;
        } else {
            res.json({
                message: 'success',
                data: newDepartment
            })
        }
    })
    
})

module.exports = router;