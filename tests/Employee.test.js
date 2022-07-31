const Employee = require("../lib/Employee");

describe("Employee", () => {
    it("Initialisation", () => {
        const employee = new Employee(0, "foo", "foo@gmail.com");
        
        expect(employee.id).toEqual(0);
        expect(employee.name).toEqual("foo");
        expect(employee.email).toEqual("foo@gmail.com");
    })
});