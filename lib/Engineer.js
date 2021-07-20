const Employee = require('./Employee');

class Engineer extends Employee {
    constructor(nameEngineer, idEngineer, emailEngineer, github) {
        super(nameEngineer, idEngineer, emailEngineer);
        this.github = github;
    }

    getRole() {
        return "Engineer";
    }

    getGithub() {
        return this.github;
    }
}

module.exports = Engineer;