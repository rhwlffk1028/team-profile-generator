// Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs')
const generateHtml = require('./util/generateHtml.js')

const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');

const employeeArr = [];

// Create an array of questions for user input
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
            message: "What is the team manager's email?",
            name: "managerEmail",
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
            message: "What is the team manager's office number?",
            name: "managerOffice",
            validate: function (input) {
                if(isNaN(input)) {
                    return "Please enter a number";
                } else {
                    return true;
                }
            }
        }
    ])
    .then(answers => {
        const {managerName, managerId, managerEmail, officeNumber} = answers;
        const manager = new Manager (managerName, managerId, managerEmail, officeNumber);
        employeeArr.push(manager);
    })
} 

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
            case "Engineer":
                questionsEngineer();
                break;
            case "Intern":
                questionsIntern();
                break;
            case "I don't want to add any more team members.":
                let data = generateHtml(employeeArr);
                createHtml(data);
                break;
        }
    })
}

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
        const {engineerName, engineerId, engineerEmail, githubName} = answers;
        const engineer = new Engineer (engineerName, engineerId, engineerEmail, githubName);
        employeeArr.push(engineer);
        askToContinue();
    })
} 

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
            message: "What is your intern's school?",
            name: "schoolName"
        }
    ])
    .then(answers => {
        const {internName, internId, internEmail, schoolName} = answers;
        const intern = new Intern (internName, internId, internEmail, schoolName);
        employeeArr.push(intern);
        askToContinue();
    })
} 

function createHtml(data) {
    fs.writeFile('.dist/index.html', data, err => {
        if (err) {
            console.log("There is an error.");
            console.log(err);
            return;
        } else {
            console.log("It successfully generated HTML!");
        }
    })
};

// Create a function to write README file
// function writeToFile(fileName, data) {
//     fs.writeFile(fileName, data, (err) => {
//         err ? console.log(err):console.log("It successfully created HTML file!")
//     });
// };

// Create a function to initialize app
// function init() {
//     questionsManager;
//     askToContinue;
// };

// Function call to initialize app
// init();

questionsManager()
    .then(askToContinue)