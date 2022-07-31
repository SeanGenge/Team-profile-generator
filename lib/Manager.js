const Employee = require("../lib/Employee");

class Manager extends Employee {
    constructor(id, name, email, officeNumber) {
        super(id, name, email);
        
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