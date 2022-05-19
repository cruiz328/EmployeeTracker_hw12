const db = require('./db/connection');
const inquirer = require('inquirer');
const table = require('console.table');

const promptOption = async () => {
    return inquirer.prompt([
        {
            type:'list',
            name: 'toDo',
            message: 'What would you like to do?',
            choices: ['View all departments', 'Add a department', 'Delete a department', 'View utilized budget by department', 
            'View all roles', 'Add a role', 'Delete a role', 'View all employees', 'View employees by manager', 'View employees by department', 
            'Add an employee', 'Update employee role', 'Update employee manager', 'Delete employee' ,  'Exit application']
        }
    ])
    .then(choice =>{
        // console.log(choice.toDo)
        switch (choice.toDo) {
            case 'View all departments':
                viewAllDepartments();
                break;
            case 'View all roles': 
                viewAllRoles();
                break; 
            case 'View all employees':
                viewAllEmployees(); 
                break;
            case 'Add a department':
                addNewDepartment();
                break;
            case 'Delete a department':
                deleteDepartment();
                break; 
            case 'Add a role':
                addNewRole(); 
                break;
            case 'Delete a role':
                deleteRole(); 
                break;
            case 'Add an employee':
                addEployee();
                break;
            case 'Update employee role':
                updateEmployeeRole();
                break;
            case 'Update employee manager':
                upadateEmployeeManager(); 
                break;
            case 'Delete employee':
                deleteEmployee();
                break;
            case 'View employees by manager': 
                viewByManager();
                break;
            case 'View employees by department': 
                viewByDepartment();
                break;
            case 'View utilized budget by department':
                departmentBudget();
                break;
            case 'Exit application':
                exit();
                break;
        }
    })
};

// EXIT function 
function exit() {
    console.log('Thank you for using Employee Tracker!')
    db.end();
    process.exit();
};

// DEPARTMENT INQUIRER FUNCTIONS
function viewAllDepartments () {
    console.log('\n===ALL DEPARTMENTS LISTED BELOW===\n');
    const sql = `SELECT department.id, department.name AS department_name
                FROM department`;
    db.query(sql, (err, row) => {
        if(err) throw err;
        console.table(row);
        console.log('===END DEPARTMENTS LIST===\n');
        promptOption();
    });
};

function addNewDepartment() {
    const sql = `INSERT INTO department (name)
                VALUES (?)`;
    inquirer.prompt([
        {
            type: 'input',
            name: 'deptName',
            message: 'Please enter the name of the department you would like to add:'
        }
    ])
    .then(data => {
        db.query(sql, [data.deptName], (err, result) => {
            if (err) throw err; 
            console.log([data.deptName] + ' has been added to the database');
            promptOption();
        });
    })
};

function deleteDepartment() {
    const sql = `DELETE FROM department WHERE id = ?`;
    inquirer.prompt([
        {
            type: 'number',
            name: 'deleteId',
            message: 'Please enter the id of the department you would like to delete:'
        }
    ])
    .then(data => {
        db.query(sql, [data.deleteId], (err, result) => {
            if (err) throw err; 
            else if(!result.affectedRows) {
                console.log('Department not found');
                deleteDepartment();
            }
            else {
            console.log( 'Department ID: #' + [data.deleteId] + ' has been removed.');
            promptOption();
            }
        });
    });
};

function  departmentBudget() {
    const sql = `SELECT department.name as deparment, SUM(salary) AS total_salary_expenses
        FROM department
        LEFT JOIN role on department.id = role.department_id
        WHERE department.id = ?`
        inquirer.prompt([
            {
                type: 'number',
                name: 'dept_id',
                message: 'Please enter the id of the department to see the sum of salary expenses:'
            }
        ])
        .then(data => {
            db.query(sql, [data.dept_id], (err, row) => {
                if (err || !row) {
                    console.log('Please enter a valid department ID#');
                }
                else {
                    console.log('\n=== EXPENSE REPORT ===\n')
                    console.table(row)
                    promptOption();
                }
            })
        })
}

// ROLE INQUIRER FUNCTIONS
function viewAllRoles() {
    console.log('\n===ALL ROLES LISTED BELOW ORDERED BY DEPARTMENT ID===\n');
    const sql = `SELECT role.*, department.name AS department_name
                FROM role 
                LEFT JOIN department on role.department_id = department.id
                ORDER BY department_id`;
    
    db.query(sql, (err, row) => {
        if(err) throw err;
        console.table(row);
        console.log('===END ROLE LIST===\n')
        promptOption();
    });
};

function addNewRole() {
    const sql = `INSERT INTO role (title, salary, department_id)
                VALUES (?,?,?)`;
    inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'Enter the name of the role you would like to create:'
        },
        {
            type: 'number',
            name: 'salary',
            message: 'Please enter the annual salary paid for this position:'
        },
        {
            type: 'number',
            name: 'department',
            message: 'Enter id# of the department this position belongs to:'
        }
    ])
    .then((data) => {
        db.query(sql, [data.title, data.salary, data.department], (err, result) => {
            if (err || !result.affectedRows) {
                console.log('Please enter a correct department id.');
                addNewRole();
            }
            else {
                console.log(data.title + ' has been added to the database.');
                promptOption();
            }
        });
    });
};

function deleteRole() {
    const sql = `DELETE FROM role WHERE id = ?`;

    inquirer.prompt([
        {
            type: 'number',
            name: 'deleteId',
            message: 'Please enter the id# of the role you wish to delete:',
        }
    ])
    .then(data => {
        db.query(sql, data.deleteId, (err, result) => {
            if (err || !result.affectedRows) {
                console.log('Role not found!')
                deleteRole();
            }
            else {
                console.log('Role has been deleted!');
                promptOption();
            }
        });
    })
};

// EMPLOYEE INQUIRER FUNCTIONS
function viewAllEmployees() {
    console.log('\n===ALL EMPLOYEES LISTED BELOW===\n')

    const sql = `SELECT e.id, e.first_name, e.last_name, r.title AS position, d.name AS department, r.salary, CONCAT (m.first_name, ' ', m.last_name) AS manager
                FROM employee e       
                LEFT JOIN role r ON e.role_id = r.id
                INNER JOIN department d ON r.department_id = d.id  
                LEFT JOIN employee m ON e.manager_id = m.id`;
    db.query(sql, (err, row) => {
        if(err) throw err;
        console.table(row)
        console.log('===END EMPLOYEE LIST===\n')
        promptOption();
    });
};

function viewByManager() { 
    const sql = `SELECT a.id, a.first_name, a.last_name, CONCAT(b.first_name, ' ', b.last_name) AS manager
                FROM employee a
                LEFT JOIN employee b ON a.manager_id = b.id
                WHERE b.id = ?`;
    inquirer.prompt([
        {
            type: 'number',
            name: 'manager_id',
            message: 'Enter the manager`s ID# to see a list of thier reporting employee`s'
        }
    ])
    .then(data => {
        console.log('\n==== LIST BELOW ====\n')
        db.query(sql, [data.manager_id], (err, row) => {
            if (err ||!row){
                console.log('Please enter a valid ID#');
            }
            else {
                console.table(row);
                promptOption();
            }
        });
    })
};

function viewByDepartment() {
    const sql = `SELECT d.name AS department_name, e.id AS employee_id, CONCAT (e.first_name, ' ', e.last_name) AS employee
                FROM department d
                LEFT JOIN role r ON d.id = r.department_id 
                INNER JOIN employee e ON r.department_id = e.role_id
                WHERE d.id = ?`;
    inquirer.prompt([
        {
            type: 'number',
            name: 'dept_id',
            message: 'Enter the department`s ID# to see a list of employee`s'
        }
    ])
    .then(data => {
        console.log('\n==== EMPLOYEES IN DEPARTMENT LISTED BELOW ====\n')
        db.query(sql, [data.dept_id], (err, row) => {
            if (err ||!row){
                console.log('Please enter a valid ID#');
            }
            else {
                console.table(row);
                promptOption();
            }
        });
    })
};

function addEployee() {
    const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
                VALUES (?,?,?,?)`;
    inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'Enter employee first name:'
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'Enter employee last name:'
        },
        {
            type: 'number',
            name: 'role_id',
            message: 'Enter employee role ID#:'
        },
        {
            type: 'number',
            name: 'manager_id',
            message: `Enter employee's manager ID#:`
        },
    ])
    .then(data => {
        db.query(sql, [data.first_name, data.last_name, data.role_id, data.manager_id], (err, row) => {
            if (err) throw err;
            else {
                console.log(data.first_name + " " + data.last_name + ' has been added to the database');
                promptOption();
            }
        });
    });
};

function updateEmployeeRole() {
    const sql = `UPDATE employee SET role_id = ? WHERE id = ?`;
    inquirer.prompt([
        {
            type: 'number',
            name: 'emp_id',
            message: 'Enter the id of the employee you wish to update:'
        },
        {
            type: 'number',
            name: 'role_id',
            message: 'Enter the id of the new role for this employee:'
        }
    ])
    .then(data => {
        db.query(sql, [data.role_id, data.emp_id], (err, result) => {
            if (err|| !result.affectedRows) {
                console.log('Employee or role id not found');
                updateEmployeeRole();
            }
            else {
                console.log('Employee ID#' + data.emp_id + '`s role has been updated\n');
                promptOption();
            }
        })
    })
}

function upadateEmployeeManager() {
    const sql = `UPDATE employee SET manager_id = ? WHERE id = ?`;
    inquirer.prompt([
        {
            type: 'number',
            name: 'emp_id',
            message: 'Enter the ID# of the employee you wish to update:'
        },
        {
            type: 'number',
            name: 'manager_id',
            message: 'Enter the new manager`s ID#:'
        }
    ])
    .then(data => {
        db.query(sql, [data.manager_id, data.emp_id], (err, result) => {
            if (err || !result.affectedRows) {
                console.log('Please be sure to enter valid ID#`s for both parties.');
            }
            else {
                console.log('\nEmployee ID#' + data.emp_id + '`s supervising manager has been updated.\n' );
                promptOption();
            }
        })
    })
};

function  deleteEmployee() {
    const sql = `DELETE FROM employee WHERE id = ?`;
    inquirer.prompt([
        {
            type: 'number',
            name: 'emp_id',
            message: 'Enter the ID# of the employee you wish to delete:'
        }
    ])
    .then(data => {
        db.query(sql, [data.emp_id], (err, result) => {
            if (err || !result.affectedRows) {
                console.log('Employee not found');
            }
            else {
                console.log('Employee has been removed from the database!');
                promptOption();
            }
        })
    })
};

promptOption();