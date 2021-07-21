// Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs')

// Import required module exports
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const generateHtml = require('./util/generateHtml.js')

// Store added employees' information in this array
const employeeArr = [];

// Ask Manager's information
const questionsManager = () => {
    return inquirer.prompt ([
        {
            type: "input",
            message: "What is the team manager's name?",
            name: "managerName"
        },
        {
            type: "input",
            message: "What is the team manager's id?",
            name: "managerId",
            validate: managerIdInput => {
                if(isNaN(managerIdInput)) {
                    return "Please enter a number";
                } else {
                    return true;
                }
            }
        },
        {
            type: "input",
            message: "What is the team manager's email?",
            name: "managerEmail",
            validate: managerEmailInput => {
                if(!managerEmailInput.includes('@')) {
                    return "Please enter a valid email";
                } else {
                    return true;
                }
            }
        },
        {
            type: "input",
            message: "What is the team manager's office number?",
            name: "managerOffice",
            validate: managerOfficeInput => {
                if(isNaN(managerOfficeInput)) {
                    return "Please enter a number";
                } else {
                    return true;
                }
            }
        }
    ])
    .then(answers => {
        // Storing manager's information
        const {managerName, managerId, managerEmail, managerOffice} = answers;
        const manager = new Manager (managerName, managerId, managerEmail, managerOffice);
        employeeArr.push(manager);
    })
} 

// Ask to add more employee or to quit
const askToContinue = () => {
    return inquirer.prompt([
        {
            type: "list",
            message: "Which type of team member would you like to add?",
            name: "employeeType",
            choices: ["Engineer", "Intern", "I don't want to add any more team members."]
        }
    ])
    .then(answers => {
        switch (answers.employeeType) {
            // if engineer was chosen, then prompt engineer questions
            case "Engineer":
                questionsEngineer();
                break;
            // if intern was chosen, then prompt engineer questions
            case "Intern":
                questionsIntern();
                break;
            // if user doesn't want to add, then terminate prompts and create HTML 
            case "I don't want to add any more team members.":
                let data = generateHtml(employeeArr);
                createHtml(data);
                break;
        }
    })
}

// Ask Engineer's information
const questionsEngineer = () => {
    return inquirer.prompt ([
        {
            type: "input",
            message: "What is your engineer's name?",
            name: "engineerName"
        },
        {
            type: "input",
            message: "What is your engineer's id?",
            name: "engineerId",
            validate: function (input) {
                if(isNaN(input)) {
                    return "Please enter a number";
                } else {
                    return true;
                }
            }
        },
        {
            type: "input",
            message: "What is your engineer's email?",
            name: "engineerEmail",
            validate: function (input) {
                if(!input.includes('@')) {
                    return "Please enter a valid email";
                } else {
                    return true;
                }
            }
        },
        {
            type: "input",
            message: "What is your engineer's GitHub username?",
            name: "githubName"
        }
    ])
    .then(answers => {
        // Storing engineer's information
        const {engineerName, engineerId, engineerEmail, githubName} = answers;
        const engineer = new Engineer (engineerName, engineerId, engineerEmail, githubName);
        employeeArr.push(engineer);
        // Ask to add more employee
        askToContinue();
    })
} 

// Ask Intern's information
const questionsIntern = () => {
    return inquirer.prompt ([
        {
            type: "input",
            message: "What is your intern's name?",
            name: "internName"
        },
        {
            type: "input",
            message: "What is your intern's id?",
            name: "internId",
            validate: function (input) {
                if(isNaN(input)) {
                    return "Please enter a number";
                } else {
                    return true;
                }
            }
        },
        {
            type: "input",
            message: "What is your intern's email?",
            name: "internEmail",
            validate: function (input) {
                if(!input.includes('@')) {
                    return "Please enter a valid email";
                } else {
                    return true;
                }
            }
        },
        {
            type: "input",
            message: "What is your intern's school?",
            name: "schoolName"
        }
    ])
    .then(answers => {
        // Storing intern's information
        const {internName, internId, internEmail, schoolName} = answers;
        const intern = new Intern (internName, internId, internEmail, schoolName);
        employeeArr.push(intern);
        // Ask to add more employee
        askToContinue();
    })
} 

// Create a function to write HTML file
function createHtml(data) {
    fs.writeFile('index.html', data, err => {
        if (err) {
            // return error message if there is an error
            console.log("There is an error.");
            console.log(err);
            return;
        } else {
            // return the message if HTML is created
            console.log("It successfully generated HTML!");
        }
    })
};

// Initialize
questionsManager()
    .then(askToContinue)