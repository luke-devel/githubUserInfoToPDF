// * Your application should prompt the user for information such as their
// name, location, bio, LinkedIn URL, and GitHub URL.

const axios = require("axios");
const inquirer = require("inquirer");
var fs = require('fs');
const util = require("util");

inquirer
    .prompt({
        message: "Enter your GitHub username:",
        name: "username"
    })
    .then(function ({ username }) {
        getRepoLength = () => {
            const queryRepoUrl = `https://api.github.com/users/${username}/repos`;

            axios.get(queryRepoUrl).then(function (res) {
                const repoLength = res.data.length;
                return repoLength;
            })
                .then(function (result) {
                    console.log('WE DID IT ' + result)
                })
        }

        getFollowers = () => {
            const queryUrl = `https://api.github.com/users/${username}`;

            axios.get(queryUrl).then(function (res) {
                const arr = [res.data.followers, res.data.following];
                return arr;
            })
                .then(function (result) {
                    console.log('followers ' + result[0])
                    console.log('following ' + result[1])
                })
        }

        getRepoLength();
        getFollowers();
    });

// //////////////////////////////////////////////////////
// const writeFileAsync = util.promisify(fs.writeFile);

// function getUserData() {
//     return inquirer.prompt([
//         {
//             type: "input",
//             message: "Enter Your Name:",
//             name: "userName"
//         },
//         {
//             type: "input",
//             message: "Enter Your Location:",
//             name: "userLocation"
//         },

//         {
//             type: "input",
//             message: "Enter Your LinkedIn URL:",
//             name: "userLinkedIn"
//         },

//         {
//             type: "input",
//             message: "Enter Your GitHub URL:",
//             name: "userGitHub"
//         }
//     ]);
// }


// function generateHTML(answers) {
//     const markup = `
// <!DOCTYPE html>
// <html lang="en">

// <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <meta http-equiv="X-UA-Compatible" content="ie=edge">
//     <title>Template Literals</title>
// </head>

// <body>
// <div class="portfolio">
// <h1 style="font-size:30px;">${answers.userName}</h1>
// <h2>${answers.userLocation}</h2>
// <p style="font-size:20px;">${answers.userLinkedIn}</p>
// <p style="font-size:20px;">${answers.userGitHub}</p>
// </div>
// </body>

// </html>
// `;
//     return markup;
// };

// getUserData()
//     .then(function (answers) {
//         const html = generateHTML(answers);
//         return writeFileAsync("index.html", html);
//     })
//     .then(function () {
//         console.log('success');
//     })
//     .catch(function (err) {
//         console.log(err);
//     });