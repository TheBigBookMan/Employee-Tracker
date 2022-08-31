// Import packages
const inquirer = require('inquirer');
const host = "http://localhost:3001";
const cTable = require('console.table');
var departmentChoiceArray = [];
const logo = require('asciiart-logo');
const config = require('./package.json');

// User is prompted with what they want to select
const openingPrompt = async () => {
    // GET fetch is made to constantly retrieve the updated database information every prompt- for when new departments, roles, employees are made or any updated information
    const updateArrays = await fetch(`${host}/api/queries`, 
    {
        method: 'GET',
    });

    const json = await updateArrays.json();
    const rolesArray = checkRoleTitles(json.dataRol);
    const departmentArray = checkDepartmentNames(json.dataDep);
    const employeesArray = json.dataEmp;
    // User is prompted with selections
    const inq = await inquirer.prompt([{
        type: "list",
        message: "What would you like to do?",
        name: "selectionPrompt",
        choices: ["View All Departments", "View All Roles", "View All Employees", "Add A Department", "Add A Role", "Add An Employee", "Update An Employee Role", "Quit"]
    }]);
        if(inq.selectionPrompt === "Quit") {
            console.log("Thank you for using the Employee Tracker, goodbye.");
            return;
        } else {
            promptChecker(inq.selectionPrompt, rolesArray, departmentArray, employeesArray);
        };
};

// Utility function to remove any falsey items
const checkRoleTitles = (array) => {
    let newArray = [];
    for(let i = 0; i < array.length; i++) {
        if(array[i]) {
            newArray.push(array[i]);
        };
    };
    return newArray;
};

// Utility function to remove any duplicates for departments
const checkDepartmentNames = (array) => {
    let newArray = [];
    for(let i = 0; i < array.length; i++){
        if(newArray.includes(array[i]) === false) {
            newArray.push(array[i]);
        };
    };
    return newArray;
};

// Function that chooses what selection was made in the prompt
const promptChecker = (selection, rolesArray, departmentArray, employeesArray) => {
    const removedDuplicates = removeDuplicates(rolesArray);
    if(selection === "View All Departments") {
        viewAllDepartments();
    } else if(selection === "View All Roles") {
        viewAllRoles();
    } else if(selection === "View All Employees") {
        viewAllEmployees();
    } else if(selection === "Add A Department") {
        addDepartment();
    } else if(selection === "Add A Role") {
        addRole(departmentArray);
    } else if(selection === "Add An Employee") {
        addEmployee(removedDuplicates);
    } else if(selection === "Update An Employee Role") {
        updateEmployeeRole(employeesArray, removedDuplicates);
    };
};

// Function that removes duplicates for roles
const removeDuplicates = (array) => {
    let newArray = [];
    for(let i = 0; i < array.length; i++){
        if(newArray.includes(array[i]) === false) {
            newArray.push(array[i]);
        };
    };
    return newArray;
};

// Async function that makes a GET request to the database to view the departments table information
const viewAllDepartments = async () => {
    try {
        const result = await fetch(`${host}/api/departments`, {
        method: 'GET',
        });

        const json = await result.json();
        console.table(json.data);
    } catch(err) {
        console.log(err);
    };
    openingPrompt();
};

// Async function to call a GET request to the database to view the roles table information
const viewAllRoles = async () => {
    try {
        const result = await fetch(`${host}/api/roles`, {
            method: 'GET',
        });

        const json = await result.json();
        console.table(json.data);
    } catch(err) {
        console.log(err);
    };
    openingPrompt();
};

// Async function that send a GET request to view the employees table information from the database
const viewAllEmployees = async () => {
    try{
        const result = await fetch(`${host}/api/employees`, {
            method: 'GET',
        });

        const json = await result.json();
        console.table(json.data);
    } catch(err) {
        console.log(err);
    }
    openingPrompt();
};

// Async function that sends a POST request, adding in a new department to the department table in the database
const addDepartment = async () => {
    var returnNewDepartment;
    try {
        const inq = await inquirer.prompt([{
            type: "input",
            message: "What is the name of the department you would like to add?",
            name: "newDepartment"
        }]);

        const newDepartment = await inq;
        console.log(`The new department of ${newDepartment.name} has been added to the database.`);
        const result = await fetch(`${host}/api/departments`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(newDepartment),
        });
        const json = await result.json();
        returnNewDepartment = json.data;
    } catch(err) {
        console.log(err);
    }
    departmentChoiceArray.push(returnNewDepartment);
    openingPrompt();
};

// Async function that calls a POST request to add a new role to the roles table in the database
const addRole = async (departmentsArray) => {
    try {
        const inq = await inquirer.prompt([{
            type: "input",
            message: "What is the name of the new role?",
            name: "newRoleName"
        }, {
            type: "number",
            message: "What is the salary of the new role?",
            name: "newRoleSalary"
        }, {
            type: "list",
            message: "Which department does the new role belong to?",
            choices: departmentsArray,
            name: "newRoleDepartment"
        }]);

        const {newRoleName, newRoleSalary, newRoleDepartment} = await inq;
        console.log(`The new role ${newRoleName} with the salary of $${newRoleSalary} within the department ${newRoleDepartment} has been added to the database.`);
            
        const result = await fetch(`${host}/api/roles`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({newRoleName, newRoleSalary, newRoleDepartment, departmentsArray})
        });
        const json = await result.json();
    } catch(err) {
        console.log(err);
    };
    openingPrompt();
};

// Async function that makes a POST request to add an employee to the employees table in the database
const addEmployee = async (rolesArray) => {
    try {
        const inq = await inquirer.prompt([{
            type: "input",
            message: "What is the new employees first name?",
            name: "newEmployeeFirstName"
        }, {
            type: "input",
            message: "What is the new employees last name?",
            name: "newEmployeeLastName"
        }, {
            type: "list",
            message: "What is the new employees role?",
            choices: rolesArray,
            name: "newEmployeeRole"
        }, {
            type: "list",
            message: "Who is the new employees manager?",
            choices: ["Isabella Stefan", "Cyrus Sigal", "Jessica Urbonas", "Gary Ryan"],
            name: "newEmployeeManager"
        }]);
            const {newEmployeeFirstName, newEmployeeLastName, newEmployeeRole, newEmployeeManager} = await inq;
            console.log(`New Employee: ${newEmployeeFirstName} ${newEmployeeLastName} with the role of ${newEmployeeRole} and manager ${newEmployeeManager} has been added to the database.`);
            const newEmployeeManagerId = await checkNewEmployeeManager(newEmployeeManager);

            const result = await fetch(`${host}/api/employees`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({newEmployeeFirstName, newEmployeeLastName, newEmployeeRole, newEmployeeManagerId, rolesArray})
            });
            const json = await result.json();
    } catch(err) {
        console.log(err);
    };
    openingPrompt();
};

// Utility function that checks for employee manager and returns their id
const checkNewEmployeeManager = (newEmployeeManager) => {
    if(newEmployeeManager === "Isabella Stefan") {
        return 1;
    } else if(newEmployeeManager === "Cyrus Sigal") {
        return 4;
    } else if(newEmployeeManager === "Jessica Urbonas") {
        return 6;
    } else if(newEmployeeManager === "Gary Ryan") {
        return 8;
    };
};

// Async function that updates an employees role and adds the new information into the database
const updateEmployeeRole = async (employeesArray, rolesArray) => {
    try {
        const inq = await inquirer.prompt([{
            type: "list",
            message: "Which employee do you want to update?",
            choices: employeesArray,
            name: "updateEmployeeName"
        }, {
            type: "list",
            message: "Which role do you want to assign to the updated employee?",
            choices: rolesArray,
            name: "updatedEmployeeRole"
        }]);

        const {updateEmployeeName, updatedEmployeeRole} = await inq;
        console.log(`The employee ${updateEmployeeName} updated role to ${updatedEmployeeRole} has been updated in the database.`);
    
        const result = await fetch(`${host}/api/employees`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({updateEmployeeName, updatedEmployeeRole, rolesArray})
        });
        const json = await result.json();
    } catch(err) {
        console.log(err);
    };
    openingPrompt();
};

// Init function that sends an ascii logo in the console and prompts the user with selection options
const init = () => { 
    console.log(
        logo({
            name: 'Employee Tracker',
            font: 'Shadow',
            lineChars: 10,
            padding: 2,
            margin: 3,
            borderColor: 'grey',
            logoColor: 'white',
            textColor: 'green',
        })
        .emptyLine()
        .right('Backend Tech Used: Node.js, Express.js, MySql')
        .emptyLine()
        .center("By Ben Smerd")
        .render()
    );
    openingPrompt();
};

// Initialise the init function
init();