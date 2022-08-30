// IMPPORT EXPRESS
const express = require('express');
const app = express();
const departmentRouter = require('../routes/departmentroute');
const employeeRouter = require('../routes/employeeroute');
const rolesRouter = require('../routes/rolesroute')

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.use('/api/departments', departmentRouter)
app.use('/api/employees', employeeRouter)
app.use('/api/roles', rolesRouter)

// MAKE THE PATHS FOR THE REQUIRED ONES AND THEN MAYBE HAVE TO USE A ROUTER IF NEED BE
app.get('/', (req, res) => {
    
})



// WRITE IN THE GET/POST/DELTE/PUT etc AND ADD IN THE SQL QUERIES AS WELL

// Express listener to find PORT
app.listen(PORT, () => {
    console.log(`Listening on PORT http://localhost:${PORT}/`)
})