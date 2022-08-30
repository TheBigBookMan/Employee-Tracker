// IMPORT INQUIRE PACKAGE
const inquirer = require('inquirer');
const host = "http://localhost:3001";
const cTable = require('console.table');
var departmentChoiceArray = [];
const {departmentArray} = require('./api/queries');

console.log("FIRST")
console.log(departmentArray)


// IMPORT THE ASCii-ART LOGO THING FOR THE INTRO -- CAN DO LAST


// User is prompted with what they want to select
const openingPrompt = async () => {
    const chosenArray = await departmentArray;
    console.log(chosenArray)
    const inq = await inquirer.prompt([{
        type: "list",
        message: "What would you like to do?",
        name: "selectionPrompt",
        choices: ["View All Departments", "View All Roles", "View All Employees", "Add A Department", "Add A Role", "Add An Employee", "Update An Employee Role", "Quit"]
    }])
        if(inq.selectionPrompt === "Quit") {
            console.log("Thank you for using the Employee Tracker, goodbye.");
            return;
        } else {
            promptChecker(inq.selectionPrompt);
        }
};

// Function that chooses what selection was made in the prompt
const promptChecker = selection => {
    if(selection === "View All Departments") {
        viewAllDepartments();
    } else if(selection === "View All Roles") {
        viewAllRoles();
    } else if(selection === "View All Employees") {
        viewAllEmployees();
    } else if(selection === "Add A Department") {
        addDepartment();
    } else if(selection === "Add A Role") {
        addRole();
    } else if(selection === "Add An Employee") {
        addEmployee();
    } else if(selection === "Update An Employee Role") {
        updateEmployeeRole();
    }
};

//WHEN I choose to view all departments
//THEN I am presented with a formatted table showing department names and department ids
const viewAllDepartments = async () => {
    // add in GET fetch
    console.log("DEPARTMENT ARRAY")
    console.log(departmentArray.depArray)
    try {
        const result = await fetch(`${host}/api/departments`, {
        method: 'GET',
    });
        const json = await result.json();
        console.table(json.data)
    } catch(err) {
        console.log(err)
    }
    openingPrompt();
}

// THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
const viewAllRoles = async () => {
    try {
        const result = await fetch(`${host}/api/roles`, {
            method: 'GET',
    });
        const json = await result.json();
        console.table(json.data)
    } catch(err) {
        console.log(err)
    };
    openingPrompt();
}

// WHEN I choose to view all employees
// THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
const viewAllEmployees = async () => {
    try{
        const result = await fetch(`${host}/api/employees`, {
            method: 'GET',
        });
        const json = await result.json();
        console.table(json.data)
    } catch(err) {
        console.log(err)
    }
    openingPrompt();
}

// WHEN I choose to add a department
// THEN I am prompted to enter the name of the department and that department is added to the database
// MAYBE PUT IN A ERROR RESPONSE FOR IF IT IS SOMETHING RANDOM
const addDepartment = async () => {
    var returnNewDepartment;
    try {
        const inq = await inquirer.prompt([{
            type: "input",
            message: "What is the name of the department you would like to add?",
            name: "newDepartment"
        }])
            const newDepartment = await inq;
            console.log(`The new department of ${newDepartment} has been added to the database.`)
            const result = await fetch(`${host}/api/departments`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(newDepartment),
            })
            const json = await result.json()
            returnNewDepartment = json.data
            console.log(returnNewDepartment)
            
            console.log(departmentChoiceArray)
            
    } catch(err) {
        console.log(err)
    }
    departmentChoiceArray.push(returnNewDepartment)
    openingPrompt();
}

// WHEN I choose to add a role
// THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
const addRole = async () => {
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
            choices: departmentArray,
            name: "newRoleDepartment"
        }])
            const {newRoleName, newRoleSalary, newRoleDepartment} = await inq;
            console.log(`The new role ${newRoleName} with the salary of $${newRoleSalary} within the department ${newRoleDepartment} has been added to the database.`);
            
            const result = await fetch(`${host}/api/roles`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({newRoleName, newRoleSalary, newRoleDepartment})
            })
            const json = await result.json()
            console.table(json.data)
    } catch(err) {
        console.log(err)
    }
    openingPrompt();
}

// WHEN I choose to add an employee
// THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
const addEmployee = async () => {
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
        choices: ["Sales Lead", "Sales Person", "Customer Service", "Lead Engineer", "Software Engineer", "Account Manager", "Accountant", "Legal Team Lead", "Lawyer"],
        name: "newEmployeeRole"
    }, {
        type: "list",
        message: "Who is the new employees manager?",
        //NEED TO IMPORT THE CHOICES FROM DB
        choices: ["IMPORT FROM DB"],
        name: "newEmployeeManager"
    }])
        const {newEmployeeFirstName, newEmployeeLastName, newEmployeeRole, newEmployeeManager} = await inq;
        // THIS WILL PROBABLY NEED TO BE CREATED INTO A CLASS
        // add in fetch for POST API

        console.log(`New Employee: ${newEmployeeFirstName} ${newEmployeeLastName} with the role of ${newEmployeeRole} and manager ${newEmployeeManager} has been added to the database.`)
    
    

    openingPrompt();
}

// WHEN I choose to update an employee role
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database

const updateEmployeeRole = () => {
    console.log("update employee role")
    inquirer.prompt([{
        type: "list",
        message: "Which employee do you want to update?",
        choices: ["NEED TO ADD FROM DATABASE I THINK"],
        name: "updateEmployeeName"
    }, {
        type: "list",
        message: "Which role do you want to assign to the updated employee?",
        choices: ["Sales Lead", "Sales Person", "Customer Service", "Lead Engineer", "Software Engineer", "Account Manager", "Accountant", "Legal Team Lead", "Lawyer"],
        name: "updatedEmployeeRole"
    }]).then(response => {
        const {updateEmployeeName, updatedEmployeeRole} = response;
        console.log(`The employee ${updateEmployeeName} updated role to ${updatedEmployeeRole} has been updated in the database.`)

        // add in fetch for PUT API
    })
    openingPrompt();
}

// CREATE FETCH CALLS FOR THE DELTETE OR MAYBE UPDATE IF THEY WANT THAT WITH THE INQUIRE RESPONSEES AND THEN FOR THE API CALL 


// init function that prompts the user with what to do
const init = () => { 
    openingPrompt();
}

// Initialise the init function
init();