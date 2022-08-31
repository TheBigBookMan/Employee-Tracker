# Employee-Tracker
## Introduction
This is a server-side application that allows the user to view information about a workplace through querying the database. They can query about departments, roles and employees information.

## Technologies
This is a backend application that uses Javascript, Node.js, Express.js, NPM packages and MySql.

## Live Demonstration URL


## Functionality
### Initialization
Once the application starts, through the console the user will be presented with a ascii logo art of the application name and creator. They are then prompted with a selection of what they would like to do- view departments, roles or employees- add departments, roles or employees- update employees roles. This prompting is done by the inquirer npm package.

<!--INPUT SCREENSHOT OF THE INITIAL STARTING SCREEN WITH LOGO-->

### GET
If the user chooses to view departments, roles or employees, they will be creating a GET request that will query the database through specific MySql commands and the express API route. The information will be collected from the database and then returned as a response to the user in the form of a table, using console.table npm package.

<!--SCREENSHOT OF THE SHOW EMPLOYEES TABLE-->

### POST
If the user chooses to add a department, role or employee, then they will be creating a POST request. The information the user provides when informed, will be sent to the API route and input to the database using MySql commands. The console will log an update of what has just been added to the database for confirmation for the user. The database will be immediately updated and then it is possible to view the newly added items with the GET requests again.

<!-- ADD SCREENSHOT OF THE ADDED MESSAGE ON ADDING DEPARTMENT, ROLE AND EMPLOYEE-->

### PUT
If the user chose to update the employee role then they will be creating a PUT request that will update the role of the employee within the database through the API routes.

### API
Using modular routing, the API route page isn't congested with routes to be chosen and therefore making information easier to understand. The use of connecting the database of MySql is important to then send MySql queries through Express and being able to send and receive information back and forth to the user.

### MySql
Using a schema folder to create a layout for the tables and a seeds folder to input some initial data. Queries were produced through Express and the API to request and receive data.

## GitHub Repo URL
