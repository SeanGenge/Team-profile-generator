const Intern = require("../lib/intern");

describe("Intern", () => {
    it("Initialisation", () => {
        const intern = new Intern(0, "foo", "foo@gmail.com", "foo academy");
        
        expect(intern.id).toEqual(0);
        expect(intern.name).toEqual("foo");
        expect(intern.email).toEqual("foo@gmail.com");
        expect(intern.school).toEqual("foo academy");
    });
    
    it("Getting the name", () => {
        const intern = new Intern(0, "foo", "foo@gmail.com", "foo academy");
        const name = intern.getName();
        
        expect(name).toEqual("foo");
    });
    
    it("Getting the id", () => {
        const intern = new Intern(0, "foo", "foo@gmail.com", "foo academy");
        const id = intern.getId();
        
        expect(id).toEqual(0);
    });
    
    it("Getting the email", () => {
        const intern = new Intern(0, "foo", "foo@gmail.com", "foo academy");
        const email = intern.getEmail();
        
        expect(email).toEqual("foo@gmail.com");
    });
    
    it("Getting the school", () => {
        const intern = new Intern(0, "foo", "foo@gmail.com", "foo academy");
        const email = intern.getSchool();
        
        expect(email).toEqual("foo academy");
    });
    
    it("Getting the role", () => {
        const intern = new Intern(0, "foo", "foo@gmail.com", "foo academy");
        const role = intern.getRole();
        
        expect(role).toEqual("Intern");
    });
});