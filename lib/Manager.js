import { Employee } from "./Employee";

export class Manager extends Employee {
    constructor(id, name, email, officeNumber) {
        super(id, name, email);
        
        this.officeNumber = officeNumber;
    }
    
    getRole() {
        return "Manager";
    }
}