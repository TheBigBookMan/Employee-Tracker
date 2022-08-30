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

router.post('/', (req, res) => {
    const {newRoleName, newRoleSalary, newRoleDepartment, departmentsArray} = req.body
    let chosenNewRoleDepartment;
    let counter = 1;
    console.log(departmentsArray)
    for(let i = 0; i < departmentsArray.length; i++) {
        if(newRoleDepartment === departmentsArray[i]) {
            counter = departmentsArray.indexOf(newRoleDepartment) + 1
            chosenNewRoleDepartment = counter;
        } 
    }
    
    const newRoleChoices = [newRoleName, newRoleSalary, chosenNewRoleDepartment];
    const sql = `INSERT INTO roles (title, salary, department_id)
    VALUES (?, ?, ?)`

    db.query(sql, newRoleChoices, (err, result) => {
        if(err) {
            res.status(400).json({error: err.message});
        } else {
            res.json({
                message: 'success',
                data: newRoleChoices
            })
        }
    })
})

module.exports = router;