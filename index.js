const inquirer = require('inquirer');
const fs = require('fs');
const mysql = require('mysql2');



const connection = mysql.createConnection(
  {
  host: 'localhost',
  user: "root",
  password: "Focus!",
  database: "myEmployees_db"
},
console.log('Connected to the Employee database')
)


connection.connect(function(){
  startInquirer();
})



const startInquirer = () => {
inquirer.prompt([
    {
    type: "list",
    name: "userChoice",
    message: "What would you like to do?",
    choices: [
        "View all departments",
        "View all roles",
        "View all employees",
        "Add a department",
        "Add a role",
        "Add an employee",
        "Update an employee role",
        "Remove a department",
        "Remove a role",
        "Remove an employee",
        "Exit"
    ]
    }
])
.then(response => {
    const correspondingFunction = response.userChoice;
    if (correspondingFunction === "View all departments") {
      viewDept();
    
    };

    if (correspondingFunction === "View all roles") {
      viewRoles();
    };

    if (correspondingFunction === "View all employees") {
      viewEmployees();
    };

    if (correspondingFunction === "Add a department") {
      addDept()
    };

    if (correspondingFunction === "Add a role") {
      addTitle()
    };

    if (correspondingFunction === "Add an employee") {
      addEmployee()
    };

    if (correspondingFunction === "Update an employee role") {
      updateEmployee();
    };

    //if (correspondingFunction === "Update an employee's manager") {
      //updateEmployeeManager();
    //};

    if (correspondingFunction === "Remove a department") {
      //removeDepartment();
      deleteDepartment();
    };

    if (correspondingFunction === "Remove a role") {
      //removeRole();
      deleteRole();
    };

    if (correspondingFunction === "Remove an employee") {
      deleteEmployee();
    };

    if (correspondingFunction === "Exit") {
      process.exit();
    };
  })
};
  
function viewDept() { 
  connection.query("SELECT * FROM department", (error, results) => {
      if (error) {
        console.error('Error executing the query:', error);
        return;
      }
      console.log(results)
      inquirer.prompt([
        {
          type: "confirm",
          name: "resetMenu",
          message: "Would you like to return to the main menu?",
          default: true
        }
      ])
        .then((response) => {
          if (response.resetMenu) {
            startInquirer();
          } else {
            process.exit();
          }
      })
});
}

function viewEmployees() {
  connection.query("SELECT * FROM employees", (error, results) => {
    if (error) {
      console.error('Error executing the query:', error);
      return;
    }
    console.log(results)
    inquirer.prompt([
      {
        type: "confirm",
        name: "resetMenu",
        message: "Would you like to return to the main menu?",
        default: true
      }
    ])
      .then((response) => {
        if (response.resetMenu) {
          startInquirer();
        } else {
          process.exit();
        }
    })
});
}

function viewRoles() {
  connection.query("SELECT * FROM job_title", (error, results) => {
    if (error) {
      console.error('Error executing the query:', error);
      return;
    }
    console.log(results)
    inquirer.prompt([
      {
        type: "confirm",
        name: "resetMenu",
        message: "Would you like to return to the main menu?",
        default: true
      }
    ])
      .then((response) => {
        if (response.resetMenu) {
          startInquirer();
        } else {
          process.exit();
        }
    })
});
  }
 


function addDept() {


    inquirer
    .prompt([
        {
            name: "departmentID",
            type: 'input',
            message: 'What is the new department ID?'
        },
        {
            name: "departmentName",
            type: 'input',
            message: 'What is the new department name?'
        }
    ])
    .then((data) => {
      console.log(data)
      connection.query("INSERT INTO department SET ?", {
        id: data.departmentID,
        department_name: data.departmentName
      }, function(error){
        if (error) throw error;
        console.log("Added a Department, congrats")
        inquirer.prompt([
          {
            type: "confirm",
            name: "resetMenu",
            message: "Would you like to return to the main menu?",
            default: true
          }
        ])
          .then((response) => {
            if (response.resetMenu) {
              startInquirer();
            } else {
              process.exit();
            }
        })
      })
        
    })
    
};

function addTitle() {


    inquirer
    .prompt([
        {
            name: "jID",
            type: 'input',
            message: 'What is the title ID?'
        },
        {
            name: "jobTitle",
            type: 'input',
            message: "What is the employee's salary?"
        },
        {
            name: "salary",
            type: 'input',
            message: "What is the employee's salary?"
        },
        {
            name: "departmentID",
            type: 'input',
            message: "What is the id of this employees department?"
        }
    ])
    .then((data) => {
        console.log(data)
        connection.query("INSERT INTO job_title SET ?", {
          id: data.jID,
          title: data.jobTitle,
          salary: data.salary,
          department_id: data.departmentID
        }, function(error){
          if (error) throw error;
          console.log("Added a Role, congrats")
          inquirer.prompt([
            {
              type: "confirm",
              name: "resetMenu",
              message: "Would you like to return to the main menu?",
              default: true
            }
          ])
            .then((response) => {
              if (response.resetMenu) {
                startInquirer();
              } else {
                process.exit();
              }
          })
        })  
      })
    
};



function addEmployee () {
    inquirer
        .prompt([
            {
                name: "eID",
                type: 'input',
                message: "What is the employee's id?"
            },
            {
                name: "fName",
                type: 'input',
                message: "What is the employee's first name?"
            },
            {
                name: "lName",
                type: 'input',
                message: "What is the id of this employees last name?"
            },
            {
                name: "jID",
                type: 'input',
                message: "Enter employee's job ID"
            },
            {
                name: "mID",
                type: 'input',
                message: "Enter employee's manager ID"
            }
        ])
        .then((data) => {
            console.log(data)
            connection.query("INSERT INTO employees SET ?", {
              id: data.eID,
              first_name: data.fName,
              last_name: data.lName,
              role_id: data.jID,
              manager_id: data.mID,
            }, function(error){
              if (error) throw error;
              console.log("Added an employee, congrats")
              inquirer.prompt([
                {
                  type: "confirm",
                  name: "resetMenu",
                  message: "Would you like to return to the main menu?",
                  default: true
                }
              ])
                .then((response) => {
                  if (response.resetMenu) {
                    startInquirer();
                  } else {
                    process.exit();
                  }
              })

            })  
        })
    };

    function deleteEmployee () {
      inquirer
      .prompt([
        {
          name: 'eID',
          type: 'input',
          message: 'What is the employee ID that you wish to delete?'
        }
      ])
      .then((data) => {
        console.log(data)
        const eID = parseInt(data.eID)
        console.log(eID)
        connection.query('DELETE FROM employees WHERE id = ?', eID, function (error, results) {
          console.log('You have successfully delete the employee')
          inquirer.prompt([
            {
              type: "confirm",
              name: "resetMenu",
              message: "Would you like to return to the main menu?",
              default: true
            }
          ])
            .then((response) => {
              if (response.resetMenu) {
                startInquirer();
              } else {
                process.exit();
              }
          })
        })
        
        })
      }
    
    function deleteRole () {
      inquirer
      .prompt([
        {
          name: 'rID',
          type: 'input',
          message: 'What is the employee ID that you wish to delete?'
        }
      ])
      .then((data) => {
        console.log(data)
        const rID = parseInt(data.rID)
        console.log(rID)
        connection.query('DELETE FROM employees WHERE id = ?', rID, function (error, results) {
          console.log('You have successfully deleted the employee')
          inquirer.prompt([
            {
              type: "confirm",
              name: "resetMenu",
              message: "Would you like to return to the main menu?",
              default: true
            }
          ])
            .then((response) => {
              if (response.resetMenu) {
                startInquirer();
              } else {
                process.exit();
              }
          })
        })
        
        })
      }
  
      function deleteDepartment () {
        inquirer
        .prompt([
          {
            name: 'dID',
            type: 'input',
            message: 'What is the Department ID that you wish to delete?'
          }
        ])
        .then((data) => {
          console.log(data)
          const dID = parseInt(data.dID)
          console.log(dID)
          connection.query('DELETE FROM departments WHERE id = ?', dID, function (error, results) {
            console.log('You have successfully deleted the department')
            inquirer.prompt([
              {
                type: "confirm",
                name: "resetMenu",
                message: "Would you like to return to the main menu?",
                default: true
              }
            ])
              .then((response) => {
                if (response.resetMenu) {
                  startInquirer();
                } else {
                  process.exit();
                }
            })
          })
          
          })
        }


  function updateEmployee () {
    inquirer
    .prompt([
      {
        name: 'eID',
        type: 'input',
        message: 'What is the employees ID that you wish to update?'
      },
      {
        name: 'roleID',
        type: 'input',
        message: 'What is the the new role id for this employee?'
      }
    ])
    .then((data) => {
      const eID = parseInt(data.eID)
      const roleID = parseInt(data.roleID)
      connection.query('UPDATE employees SET role_id = ? WHERE id = ?', [roleID, eID], function (error, results) {
        inquirer.prompt([
          {
            type: "confirm",
            name: "resetMenu",
            message: "Would you like to return to the main menu?",
            default: true
          }
        ])
          .then((response) => {
            if (response.resetMenu) {
              startInquirer();
            } else {
              process.exit();
            }
        })
      })
    })
  }

module.exports = startInquirer;

