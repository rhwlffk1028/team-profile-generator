const Employee = require('./Employee');

class Manager extends Employee {
    constructor(nameManager, idManager, emailManager, officeNumber) {
        super(nameManager, idManager, emailManager);
        this.officeNumber = officeNumber;
    }

    getRole() {
        return "Manager";
    }

    getOfficeNumber() {
        return this.officeNumber;
    }
}

module.exports = Manager;