const inquirer = require('inquirer');
const mysql = require('mysql2');

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // {TODO: Add your MySQL password}
    password: 'password',
    database: 'employee_tracker'
  },
  console.log(`Connected to the employee_tracker database.`)
);

function start() {
inquirer
  .prompt([
    // {
    //   type: 'input',
    //   name: 'name',
    //   message: 'What is your name?'
    // },
    {
      type: 'list',
      message: 'Which do you want to see?',
      name: 'View',
      choices: ['View all departments', 'View all roles']
    },
  ])

  .then(data => {
    if (data.View == 'View all departments') {
        db.query('SELECT * FROM department', function (err, results) {
            console.log(results);
            start()
          });
    }
  });
}

start()