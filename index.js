import inquirer from "inquirer";
import { Enum } from './lib/Enum.js'

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
                members.push(response);
                role = tempRole;
                
                // If the response does matches the I don't want to add any more then finish
                if (role === this.TeamMembersChoices.get(this.memberOptions[this.memberOptions.length - 1])) {
                    finished = true;
                    console.log("finished");
                }
            })
            .catch(err => {
                console.log(err);
            });
        }
        
        return members;
    }
    
    async start() {
        // Add the team manager first
        let teamAdd = this.TeamMembersChoices.get(this.memberOptions[0]);
        let members = await this.askQuestions(teamAdd);
        
        // Create the html once we have all the members
        
    }
}

// Start
const app = new App();
app.start();