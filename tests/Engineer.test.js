const Engineer = require("../lib/engineer");

describe("Engineer", () => {
    it("Initialisation", () => {
        const engineer = new Engineer(0, "foo", "foo@gmail.com", "foo");
        
        expect(engineer.id).toEqual(0);
        expect(engineer.name).toEqual("foo");
        expect(engineer.email).toEqual("foo@gmail.com");
        expect(engineer.github).toEqual("foo");
    });
    
    it("Getting the name", () => {
        const engineer = new Engineer(0, "foo", "foo@gmail.com", "foo");
        const name = engineer.getName();
        
        expect(name).toEqual("foo");
    });
    
    it("Getting the id", () => {
        const engineer = new Engineer(0, "foo", "foo@gmail.com", "foo");
        const id = engineer.getId();
        
        expect(id).toEqual(0);
    });
    
    it("Getting the email", () => {
        const engineer = new Engineer(0, "foo", "foo@gmail.com", "foo");
        const email = engineer.getEmail();
        
        expect(email).toEqual("foo@gmail.com");
    });
    
    it("Getting the github", () => {
        const engineer = new Engineer(0, "foo", "foo@gmail.com", "foo");
        const email = engineer.getGithub();
        
        expect(email).toEqual("foo");
    });
    
    it("Getting the role", () => {
        const engineer = new Engineer(0, "foo", "foo@gmail.com", "foo");
        const role = engineer.getRole();
        
        expect(role).toEqual("Engineer");
    });
});