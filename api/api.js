// IMPPORT EXPRESS
const express = require('express');
const app = express();
const departmentRouter = require('../routes/departmentroute');
const employeeRouter = require('../routes/employeeroute');
const rolesRouter = require('../routes/rolesroute')
// IMPORT MYSQL- LOOK AT THE MINI PROJET FOR THAT STUFF
const mysql = require('mysql2');
// IMPORT THE ROUTER FROM THE ROUTES FOLDER WITH WHATEVER ROUTE NEEDED
// ADD IN THE PORT WITH THE ENV.process PORT ONE OR 3001
const PORT = process.env.PORT || 3001;
// DO app.useJSON AND URL ENCODED
app.use(express.json());
app.use(express.urlencoded({extended: false}));
// CREATE CONNEcTION FOR SQL

app.use('/department', departmentRouter)
app.use('/employee', employeeRouter)
app.use('/roles', rolesRouter)

// MAKE THE PATHS FOR THE REQUIRED ONES AND THEN MAYBE HAVE TO USE A ROUTER IF NEED BE
app.get('/', (req, res) => {
    res.send("It worked")
    console.log("Hey")
})

// WRITE IN THE GET/POST/DELTE/PUT etc AND ADD IN THE SQL QUERIES AS WELL

// Express listener to find PORT
app.listen(PORT, () => {
    console.log(`Listening on PORT http://localhost:${PORT}/`)
})