// Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs')
const generateHtml = require('./util/generateHtml.js')

const Employee = require('./lib/Employee');
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');

// Create an array of questions for user input
const questions = [
    {
        type: "input",
        message: "What is the team manager's name?",
        name: "managerName"
    },
    {
        type: "input",
        message: "What is the team manager's id?",
        name: "managerId"
    },
    {
        type: "input",
        message: "What is the team manager's email?",
        name: "managerEmail"
    },
    {
        type: "input",
        message: "What is the team manager's office number?",
        name: "managerOffice"
    }
];

// Users are prompted with questions and get their answers
const userPrompt = () => {
    inquirer.prompt((questions)).then((answers) => {
        writeToFile('team-profile.html', generateHtml(answers));
    });
};

// Create a function to write README file
function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, (err) => {
        err ? console.log(err):console.log("It successfully created HTML file!")
    });
};

// Create a function to initialize app
function init() {
    userPrompt();
};

// Function call to initialize app
init();