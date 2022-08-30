// IMPORT INQUIRE PACKAGE
const inquirer = require('inquirer');
const host = "http://localhost:3001";
const cTable = require('console.table');
var departmentChoiceArray = [];

// IMPORT THE ASCii-ART LOGO THING FOR THE INTRO -- CAN DO LAST



// User is prompted with what they want to select
const openingPrompt = async () => {
    /// maybe make another fetch GET that gets all roles and departments and employees and put it called every start of opening prompt so it gets back up to date info from database
    const updateArrays = await fetch(`${host}/api/queries`, 
    {
        method: 'GET',
    });
    const json = await updateArrays.json()
    const rolesArray = checkRoleTitles(json.dataRol)
    const departmentArray = checkDepartmentNames(json.dataDep)
    const employeesArray = json.dataEmp

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
            promptChecker(inq.selectionPrompt, rolesArray, departmentArray, employeesArray);
        }
};

const checkRoleTitles = (array) => {
    let newArray = []
    for(let i = 0; i < array.length; i++) {
        if(array[i]) {
            newArray.push(array[i])
        }
    }
    return newArray;
}

const checkDepartmentNames = (array) => {
    let newArray = []
    for(let i = 0; i < array.length; i++){
        if(newArray.includes(array[i]) === false) {
            newArray.push(array[i])
        } 
    }
    return newArray;
}

// Function that chooses what selection was made in the prompt
const promptChecker = (selection, rolesArray, departmentArray, employeesArray) => {
    const removedDuplicates = removeDuplicates(rolesArray)
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
    }
};

const removeDuplicates = (array) => {
    let newArray = []
    for(let i = 0; i < array.length; i++){
        if(newArray.includes(array[i]) === false) {
            newArray.push(array[i])
        } 
    }
    return newArray;
}

//WHEN I choose to view all departments
//THEN I am presented with a formatted table showing department names and department ids
const viewAllDepartments = async () => {
    // add in GET fetch
    
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
            console.log(`The new department of ${newDepartment.name} has been added to the database.`)
            const result = await fetch(`${host}/api/departments`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(newDepartment),
            })
            const json = await result.json()
            returnNewDepartment = json.data
            
    } catch(err) {
        console.log(err)
    }
    departmentChoiceArray.push(returnNewDepartment)
    openingPrompt();
}

// WHEN I choose to add a role
// THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
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
        }])
            const {newRoleName, newRoleSalary, newRoleDepartment} = await inq;
            console.log(`The new role ${newRoleName} with the salary of $${newRoleSalary} within the department ${newRoleDepartment} has been added to the database.`);
            
            const result = await fetch(`${host}/api/roles`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({newRoleName, newRoleSalary, newRoleDepartment, departmentsArray})
            })
            const json = await result.json()
    } catch(err) {
        console.log(err)
    }
    openingPrompt();
}

// WHEN I choose to add an employee
// THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
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
        }])
            const {newEmployeeFirstName, newEmployeeLastName, newEmployeeRole, newEmployeeManager} = await inq;
    
            console.log(`New Employee: ${newEmployeeFirstName} ${newEmployeeLastName} with the role of ${newEmployeeRole} and manager ${newEmployeeManager} has been added to the database.`)
    
            const newEmployeeManagerId = await checkNewEmployeeManager(newEmployeeManager)

            const result = await fetch(`${host}/api/employees`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({newEmployeeFirstName, newEmployeeLastName, newEmployeeRole, newEmployeeManagerId, rolesArray})
            })
            const json = await result.json()
            console.log(json)
    } catch(err) {
        console.log(err)
    }
    openingPrompt();
}

const checkNewEmployeeManager = (newEmployeeManager) => {
    if(newEmployeeManager === "Isabella Stefan") {
        return 1;
    } else if(newEmployeeManager === "Cyrus Sigal") {
        return 4;
    } else if(newEmployeeManager === "Jessica Urbonas") {
        return 6;
    } else if(newEmployeeManager === "Gary Ryan") {
        return 8;
    }
}
// WHEN I choose to update an employee role
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database

const updateEmployeeRole = async (employeesArray, rolesArray) => {
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
    }])
        const {updateEmployeeName, updatedEmployeeRole} = await inq;
        console.log(`The employee ${updateEmployeeName} updated role to ${updatedEmployeeRole} has been updated in the database.`)

        // add in fetch for PUT API
        const result = await fetch(`${host}/api/employees`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({updateEmployeeName, updatedEmployeeRole, rolesArray})
        })
        const json = await result.json()
        console.log(json)

    openingPrompt();
}

// CREATE FETCH CALLS FOR THE DELTETE OR MAYBE UPDATE IF THEY WANT THAT WITH THE INQUIRE RESPONSEES AND THEN FOR THE API CALL 


// init function that prompts the user with what to do
const init = () => { 
    openingPrompt();
}

// Initialise the init function
init();