// * Your application should prompt the user for information such as their
// name, location, bio, LinkedIn URL, and GitHub URL.

const inquirer = require("inquirer");
const axios = require("axios");
const pdf = require('html-pdf');

class Program {
    constructor() {
        this.githubUserName = null;
        this.color = null;
    }

    promptUser() {
        return inquirer.prompt([
            {
                message: 'What is your user name',
                name: 'githubUserName'
            }
        ]).then(({ githubUserName }) => {
            this.githubUserName = githubUserName;
            this.makeApiRequest();
        })
    }

    makeApiRequest() {
        return Promise.all(
            [
                axios.get(`https://api.github.com/users/${this.githubUserName}`),
                axios.get(`https://api.github.com/users/${this.githubUserName}/starred`)
            ])
            .then((
                [
                    {
                        data:
                        {
                            avatar_url,
                            location,
                            name,
                            blog,
                            bio,
                            public_repos,
                            followers,
                            following
                        }
                    },
                    {
                        data:
                        {
                            length
                        }
                    }
                ]
            ) => {
                this.avatar_url = avatar_url;
                this.location = location;
                this.name = name;
                this.blog = blog;
                this.bio = bio;
                this.public_repos = public_repos;
                this.followers = followers;
                this.following = following;
                this.stars = length;
                console.log(this);
                this.createHtml();
            })
    }

    createHtml() {
        this.html = `
        <!DOCTYPE html>
        <html lang="en">
        
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <title>GitHubPortfolio</title>
        </head>
        
        <style>
            body {
                background-color: powderblue;
            }
        
            div.intro {
                background-color: grey;
                text-align: center;
                margin-top: 50px;
                margin-left: 200px;
                margin-right: 200px;
            }
        </style>
        
        <body>
        
            <body>
                <div class="intro">
                    <img src="${this.avatar_url}" alt="GitHub Avatar" height="200" width="200" style="
                    padding-top: 50px;">
                    <h1 style="font-size:30px;">Hi!</h1>
                    <h2>My Name is ${this.name}!</h2>
                </div>
            </body>
        
        </html>
    `;
        console.log(this);
        this.createPdf();
    }

    createPdf() {
        pdf.create(this.html).toFile('./class-test.pdf', function (err, res) {
            if (err) return console.log(err);
            console.log(res);
        });
    }

}

var newProgram = new Program();
newProgram.promptUser();
