const express = require('express');
const mysql = require('mysql2');
const arrayE = []

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Summerland!5',
    database: 'employee_tracker'
})

const departmentArray = (array) => {
    db.query(`SELECT * FROM departments`, (err, result) => {
        // console.log(result)
        result.forEach(item => {
            array.push(item.name);
            // console.log(array)
            return array;
        })
        
    })
    
}
const newerAr = departmentArray(arrayE)
console.log(newerAr + "HERREE")
// try to get this array to main place and get it updated everyime theres a new entry


module.exports = departmentArray;