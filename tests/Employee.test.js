const Employee = require("../lib/Employee");

describe("Employee", () => {
    it("Initialisation", () => {
        const employee = new Employee(0, "foo", "foo@gmail.com");
        
        expect(employee.id).toEqual(0);
        expect(employee.name).toEqual("foo");
        expect(employee.email).toEqual("foo@gmail.com");
    });
    
    it("Getting the name", () => {
        const employee = new Employee(0, "foo", "foo@gmail.com");
        const name = employee.getName();
        
        expect(name).toEqual("foo");
    });
    
    it("Getting the id", () => {
        const employee = new Employee(0, "foo", "foo@gmail.com");
        const id = employee.getId();
        
        expect(id).toEqual(0);
    });
    
    it("Getting the email", () => {
        const employee = new Employee(0, "foo", "foo@gmail.com");
        const email = employee.getEmail();
        
        expect(email).toEqual("foo@gmail.com");
    });
    
    it("Getting the role", () => {
        const employee = new Employee(0, "foo", "foo@gmail.com");
        const role = employee.getRole();
        
        expect(role).toEqual("Employee");
    });
});