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
                message: 'What is your GitHub user name?:',
                name: 'githubUserName'
            },
            {
                message: 'What is your favorite color?:',
                name: 'favColor'
            }
        ]).then(({ githubUserName, favColor }) => {
            this.githubUserName = githubUserName;
            this.favColor = favColor;
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
                            following,
                            company
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
                this.company = company;
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
            <link href="https://fonts.googleapis.com/css?family=Roboto&display=swap" rel="stylesheet">
            <title>GitHubPortfolio</title>
        </head>
        
        <style>
            body {
                background-color: ${this.favColor};
                color: white;
                text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
            }
        
            div.intro {
                background-color: orange;
                text-align: center;
                margin-top: 50px;
                margin-left: 100px;
                margin-right: 100px;
                margin-bottom: 50px;
                border-radius: 10px;
                font-family: Roboto;
                font-weight: bold;
            }

            div.links{
                margin-left: 40px;
                text-align: left;
                padding-bottom: 20px;
                font-size: 20px;
            }

            div.bio{
                text-align: center;
                margin-bottom: 50px;
            }

            div.repo{
                background-color: orange;
                width: 300px;
                height: 100px;
                text-align: center;
                padding-top: 5px;
                padding-bottom: 50px;
                margin-left: 60px;
                border-radius: 10px;
                display: inline-block;
            }

            div.followers{
                background-color: orange;
                width: 300px;
                height: 100px;
                text-align: center;
                padding-top: 5px;
                padding-bottom: 50px;
                border-radius: 10px;
                display: inline-block;
                margin-left: 40px;
            }

            div.stars{
                background-color: orange;
                width: 300px;
                height: 100px;
                text-align: center;
                padding-top: 5px;
                padding-bottom: 50px;
                margin-left: 60px;
                margin-top: 40px;
                border-radius: 10px;
                display: inline-block;
            }

            div.following{
                background-color: orange;
                width: 300px;
                height: 100px;
                text-align: center;
                padding-top: 5px;
                margin-top: 40px;
                padding-bottom: 50px;
                border-radius: 10px;
                display: inline-block;
                margin-left: 40px;
            }

            div.githubinfo2{
                margin-bottom: 50px;
            }

        </style>
        
        <body>
        
            <body>
                <div class="intro">

                    <img src="${this.avatar_url}" alt="GitHub Avatar" height="200" width="200"
                    style="padding-top: 50px;">
                    <h1 style="font-size:50px;">Hi!</h1>
                    <h2 style="font-size:40px;">My Name is ${this.name}!</h2>
                    <h2 style="font-size:30px;">Currently @ ${this.company}</h2>
        
                    <div class="links">
                        <a href="https://www.google.com/maps/place/${this.location}" style="color: white; font-weight: bold;">${this.location}</a>
                        <a href="https://github.com/${this.githubUserName}" style="color: white; font-weight: bold; padding-left: 70px;">GitHub</a>
                        <a href="${this.blog}" style="color: white; font-weight: bold; padding-left: 130px;">Blog</a>
                    </div>

                </div>

                <div class="bio">

                    <h1 style="font-size:30px;">${this.bio}</h1>

                </div>

                <div class="githubinfo1">

                    <div class="repo">
                    <h2 style="font-size:30px;">Public Repositories</h2>
                    <h2 style="font-size:30px;">${this.public_repos}</h2>
                    </div>
                
                    <div class="followers">
                    <h2 style="font-size:30px;">Followers</h2>
                    <h2 style="font-size:30px;">${this.followers}</h2>
                    </div>

                </div>

                <div class="githubinfo2">

                    <div class="stars">
                    <h2 style="font-size:30px;">GitHub Stars</h2>
                    <h2 style="font-size:30px;">${this.stars}</h2>
                    </div>
            
                    <div class="following">
                    <h2 style="font-size:30px;">Following</h2>
                    <h2 style="font-size:30px;">${this.following}</h2>
                    </div>

            </div>

            </body>
        
        </html>
    `;
        console.log(this);
        this.createPdf();
    }

    createPdf() {
        pdf.create(this.html).toFile('./pdf-output.pdf', function (err, res) {
            if (err) return console.log(err);
            console.log(res);
        });
    }

}

var newProgram = new Program();
newProgram.promptUser();
