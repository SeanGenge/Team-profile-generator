const inquirer = require("inquirer");
const HTMLParser = require('node-html-parser');
const fs = require('fs');
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const Enum = require('./lib/Enum');

class App {
    constructor() {
        this.memberOptions = ["Team Manager", "Engineer", "Intern", "I don't want to add any more team members"];
        this.TeamMembersChoices = new Enum(this.memberOptions);
    }
    
    getQuestions(role) {
        let questions = [
        {
            type: "input",
            message: `What is the ${role}'s name?`,
            name: "name"
        },
        {
            type: "input",
            message: `What is the ${role}'s id?'`,
            name: "id"
        },
        {
            type: "input",
            message: `What is the ${role}'s email?'`,
            name: "email"
        },
        {
            type: "input",
            message: `What is the ${role}'s office number?'`,
            name: "officeNum",
            when: role === this.TeamMembersChoices.get("Team Manager")
        },
        {
            type: "input",
            message: `What is the ${role}'s Github username?'`,
            name: "github",
            when: role === this.TeamMembersChoices.get("Engineer")
        },
        {
            type: "input",
            message: `What is the ${role}'s school?'`,
            name: "school",
            when: role === this.TeamMembersChoices.get("Intern")
        },
        {
            type: "list",
            message: `Which type of team member would you like to add?'`,
            name: "type",
            choices: this.TeamMembersChoices.keys().slice(1)
        }];
        
        return questions;
    }
    
    async askQuestions(role) {
        // Continue adding more members to the team
        let finished = false;
        let members = [];
        
        while(!finished) {
            let questions = this.getQuestions(role);
            
            await inquirer.prompt(questions)
            .then(response => {
                let tempRole = response.type;
                // add to members
                response.type = role;
                
                switch(role) {
                    case this.memberOptions[0]:
                        // Team Member
                        members.push(new Manager(response.id, response.name, response.email, response.officeNum));
                        break;
                    case this.memberOptions[1]:
                        // Engineer
                        members.push(new Engineer(response.id, response.name, response.email, response.github));
                        break;
                    case this.memberOptions[2]:
                        // Intern
                        members.push(new Intern(response.id, response.name, response.email, response.school));
                        break;
                }
                
                role = tempRole;
                
                // If the response does matches the I don't want to add any more then finish
                if (role === this.TeamMembersChoices.get(this.memberOptions[this.memberOptions.length - 1])) {
                    finished = true;
                }
            })
            .catch(err => {
                console.log(err);
            });
        }
        
        return members;
    }
    
    GenerateHTML(members) {
        // Generates the html for a list of members
        // Read all the html files
        let mainHTML = HTMLParser.parse(fs.readFileSync('./src/_main.html', 'utf8', (err, data) => {
            if (err) {
                console.log(err);
                return;
            }
            
            return data;
        }));
        
        let memberCard = HTMLParser.parse(fs.readFileSync('./src/_memberCard.html', 'utf8', (err, data) => {
            if (err) {
                console.log(err);
                return;
            }
            
            return data;
        }));
        
        let styling = HTMLParser.parse(fs.readFileSync('./src/_style.css', 'utf8', (err, data) => {
            if (err) {
                console.log(err);
                return;
            }
            
            return data;
        }));
        
        // If there was an error, don't try to parse the HTML
        if (!mainHTML || !memberCard || !styling) {
            console.log("There is a problem with the template HTML");
            
            return;
        }
        
        let mainContainer = mainHTML.getElementById("main_container");
        
        // Add the memberCards for each of the members
        members.forEach(member => {
            // Create a copy
            let mc = HTMLParser.parse(memberCard.toString());
            
            // Add the fields to the html
            mc.querySelector(".name").innerHTML = member.getName();
            mc.querySelector(".type").innerHTML = member.getRole();
            mc.querySelector(".member-id").innerHTML = member.getId();
            mc.querySelector(".email").innerHTML = member.getEmail();
            mc.querySelector(".email").setAttribute("href", `mailto: ${member.getEmail()}`);
            
            let officeNum = mc.querySelector(".officeNum");
            let github = mc.querySelector(".github");
            let school = mc.querySelector(".school");
            let listGroup = mc.querySelector(".list-group");
            let typeIcon = mc.querySelector(".type-icon");
            
            if (member.getRole() === "Manager") {
                // Team manager
                officeNum.innerHTML = member.getOfficeNumber();
                typeIcon.classList.add("fa-arrows-down-to-people");
                
                listGroup.removeChild(github.parentNode);
                listGroup.removeChild(school.parentNode);
            }
            else if (member.getRole() === this.memberOptions[1]) {
                // Engineer
                github.innerHTML = member.getGithub();
                github.setAttribute("href", `https://github.com/${member.getGithub()}`);
                typeIcon.classList.add("fa-atom");
                
                listGroup.removeChild(officeNum.parentNode);
                listGroup.removeChild(school.parentNode);
            }
            else if (member.getRole() === this.memberOptions[2]) {
                // Intern
                school.innerHTML = member.getSchool();
                typeIcon.classList.add("fa-user-graduate");
                
                listGroup.removeChild(officeNum.parentNode);
                listGroup.removeChild(github.parentNode);
            }
            
            // Add the member card to the main container
            mainContainer.appendChild(mc);
        });
        
        // Write the HTML and CSS files
        const fileName = `./dist/${members[0].getName()}-${members[0].getId()}_members.html`;
        fs.writeFile(fileName, mainHTML.toString(), err => {
            if (err) {
                console.log(err);
                return;
            }
            
            console.log(`finished generating the HTML file: ${fileName}`);
        });
        
        fs.writeFile(`./dist/style.css`, styling.toString(), err => {
            if (err) {
                console.log(err);
                return;
            }
            
            console.log("finished generating the CSS file");
        });
    }
    
    async start() {
        // Add the team manager first
        let teamAdd = this.TeamMembersChoices.get(this.memberOptions[0]);
        let members = await this.askQuestions(teamAdd);
        
        this.GenerateHTML(members);
    }
}

// Start
const app = new App();
app.start();