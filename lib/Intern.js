const Employee = require('./Employee');

class Intern extends Employee {
    constructor(nameIntern, idIntern, emailIntern, school) {
        super(nameIntern, idIntern, emailIntern);
        this.school = school;
    }

    getRole() {
        return "Intern";
    }

    getSchool() {
        return this.school;
    }
}

module.exports = Intern;