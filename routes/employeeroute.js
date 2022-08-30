const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Summerland!5',
    database: 'employee_tracker'
    },
    console.log('Employee route connected to the database.')
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


router.post('/', (req, res) => {
    const {newEmployeeFirstName, newEmployeeLastName, newEmployeeRole, newEmployeeManagerId, rolesArray} = req.body;
    let chosenRoleId;
    for(let i = 0; i < rolesArray.length; i++) {
        if(newEmployeeRole === rolesArray[i]) {
            chosenRoleId = rolesArray.indexOf(newEmployeeRole) + 1
        };
    }
    const newEmployeeChoices = [newEmployeeFirstName, newEmployeeLastName, chosenRoleId, newEmployeeManagerId];
    const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id)
    VALUES (?, ?, ?, ?)`

    db.query(sql, newEmployeeChoices, (err, result) => {
        if(err) {
            res.status(400).json({error: err.message});
        } else {
            res.json({
                message: 'success',
                data: newEmployeeChoices
            })
        }
    })
})

router.put('/', (req, res) => {
    const {updateEmployeeName, updatedEmployeeRole, rolesArray} = req.body
    
    let updatedRoleId;
    for(let i = 0; i < rolesArray.length; i++) {
        if(updatedEmployeeRole === rolesArray[i]) {
            updatedRoleId = rolesArray.indexOf(updatedEmployeeRole) + 1
        }
    }

    const splitName = updateEmployeeName.split(' ')
    const updatedEmployeeFirstName = splitName[0];
    // const updatedEmployeeLastName = splitName[1];

    const updatedEmployeeInfo = [updatedRoleId, updatedEmployeeFirstName]
    const sql = `UPDATE employees
    SET role_id = ?
    WHERE first_name = ?;`

    db.query(sql, updatedEmployeeInfo, (err, result) => {
        if(err) {
            res.status(400).json({error: err.message});
        } else {
            res.json({
                message: 'success',
                data: updatedEmployeeInfo
            })
        }
    })
})

module.exports = router;