// IMPORT INQUIRE PACKAGE
const inquirer = require('inquirer');

// IMPORT THE SQL2 PACKAGE???? MAYBE JUST FOR INDEX PAGE
// IMPORT THE CONSOLE TABLE PACKAGE TO SHOW THE TABLES OF DATA NEATLY IN THE CONSOLE

// IMPORT THE ASCii-ART LOGO THING FOR THE INTRO -- CAN DO LAST

// MAyBE NEED TO IMPORT THE API FILE TO HERE TO CONNECT THE FETCH WITH THE API RECIEVE WITH EXPRESS????? DOUBLE CHECK ALLL THAT

// WRITE UP THE INQUIRE PROMPTS AND MAKE IT SO THAT IF THEY WANT TO QUIT IT CANCELS OR IF THEY WANT TO SELECT THE PROMPTS THEN IT GOES TO THOSE OTHER PROMPTS

// User is prompted with what they want to select
const openingPrompt = () => {
    return inquirer.prompt([{
        type: "list",
        message: "What would you like to do?",
        name: "selectionPrompt",
        choices: ["View All Departments", "View All Roles", "View All Employees", "Add A Department", "Add A Role", "Add An Employee", "Update An Employee Role", "Quit"]
    }]).then(response => {
        if(response.selectionPrompt === "Quit") {
            console.log("Thank you for using the Employee Tracker, goodbye.");
            return;
        } else {
            promptChecker(response.selectionPrompt);
        }
    })
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

const viewAllDepartments = () => {
    console.log("View all departmentssss")
    // add in GET fetch


    // openingPrompt();
}

// WHEN I choose to view all roles
// THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role

const viewAllRoles = () => {
    console.log("View all rolessss")
     // add in GET fetch
    
    // openingPrompt();
}

// WHEN I choose to view all employees
// THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to

const viewAllEmployees = () => {
    console.log("View all Employeeeeees")
     // add in GET fetch
    
    // openingPrompt();
}

// WHEN I choose to add a department
// THEN I am prompted to enter the name of the department and that department is added to the database
// MAYBE PUT IN A ERROR RESPONSE FOR IF IT IS SOMETHING RANDOM

const addDepartment = () => {
    return inquirer.prompt([{
        type: "input",
        message: "What is the name of the department you would like to add?",
        name: "newDepartment"
    }]).then(response => {
        const newDepartment = response.newDepartment;
        console.log(`The new department of ${newDepartment} has been added to the database.`)
        // add in fetch for POST API

        // openingPrompt();
    })
}

// WHEN I choose to add a role
// THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database

const addRole = () => {
    return inquirer.prompt([{
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
        choices: ["Engineering", "Finance", "Legal", "Sales", "Service"],
        name: "newRoleDepartment"
    }]).then(response => {
        const {newRoleName, newRoleSalary, newRoleDepartment} = response;
        // MAYBE TURN THIS INTO A CLASS FOR ROLES!?!?!

        console.log(`The new role ${newRoleName} with the salary of $${newRoleSalary} within the department ${newRoleDepartment} has been added to the database.`);
    })

    // openingPrompt();
}

// WHEN I choose to add an employee
// THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database

const addEmployee = () => {
    console.log("Add employeeee")
    return inquirer.prompt([{
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
    }]).then(response => {
        const {newEmployeeFirstName, newEmployeeLastName, newEmployeeRole, newEmployeeManager} = response;
        // THIS WILL PROBABLY NEED TO BE CREATED INTO A CLASS

        console.log(`New Employee: ${newEmployeeFirstName} ${newEmployeeLastName} with the role of ${newEmployeeRole} and manager ${newEmployeeManager} has been added to the database.`)
    })
    

    // openingPrompt();
}

// WHEN I choose to update an employee role
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database

const updateEmployeeRole = () => {
    console.log("update employee role")

    // openingPrompt();
}


// MAKE THE INQUIRE RESPONSES CALL THE CLASS IF ITS CREATING AND CREATE NEW CLASS TO THEN CALL A PUT FETCH REQUEST WITH THE NEW CLASS AS THE BODY


// CREATE THE FETCH CALLS FOR THE PROMPT ANSWERS THAT ARE JYUST WANTING INFOR AND ADD IN THE PATHS FOR THE API GET REQUEST

// CREATE FETCH CALLS FOR THE DELTETE OR MAYBE UPDATE IF THEY WANT THAT WITH THE INQUIRE RESPONSEES AND THEN FOR THE API CALL 


// init function that prompts the user with what to do
const init = () => { 
    openingPrompt();
}

// Initialise the init function
init();