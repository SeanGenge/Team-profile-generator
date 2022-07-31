const Manager = require("../lib/manager");

describe("Manager", () => {
    it("Initialisation", () => {
        const manager = new Manager(0, "foo", "foo@gmail.com", "0123");
        
        expect(manager.id).toEqual(0);
        expect(manager.name).toEqual("foo");
        expect(manager.email).toEqual("foo@gmail.com");
        expect(manager.officeNumber).toEqual("0123");
    });
    
    it("Getting the name", () => {
        const manager = new Manager(0, "foo", "foo@gmail.com", "0123");
        const name = manager.getName();
        
        expect(name).toEqual("foo");
    });
    
    it("Getting the id", () => {
        const manager = new Manager(0, "foo", "foo@gmail.com", "0123");
        const id = manager.getId();
        
        expect(id).toEqual(0);
    });
    
    it("Getting the email", () => {
        const manager = new Manager(0, "foo", "foo@gmail.com", "0123");
        const email = manager.getEmail();
        
        expect(email).toEqual("foo@gmail.com");
    });
    
    it("Getting the office number", () => {
        const manager = new Manager(0, "foo", "foo@gmail.com", "0123");
        const email = manager.getOfficeNumber();
        
        expect(email).toEqual("0123");
    });
    
    it("Getting the role", () => {
        const manager = new Manager(0, "foo", "foo@gmail.com", "0123");
        const role = manager.getRole();
        
        expect(role).toEqual("Manager");
    });
});