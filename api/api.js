// Import packages and modules
const express = require('express');
const app = express();
const departmentRouter = require('../routes/departmentroute');
const employeeRouter = require('../routes/employeeroute');
const rolesRouter = require('../routes/rolesroute');
const queriesRouter = require('../routes/queries');

// Creating a PORT 
const PORT = process.env.PORT || 3001;

// Middleware for incoming information to be converted to JSON
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Middleware to use the routers from different modules in separate paths
app.use('/api/departments', departmentRouter);
app.use('/api/employees', employeeRouter);
app.use('/api/roles', rolesRouter);
app.use('/api/queries', queriesRouter);

// Express listener to find PORT
app.listen(PORT, () => {
    console.log(`Listening on PORT http://localhost:${PORT}/`);
});