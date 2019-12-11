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
        const queryUrl = `https://api.github.com/users/${username}/repos?per_page=100`;

        axios.get(queryUrl).then(function (res) {
            const repoNames = res.data.map(function (repo) {
                return repo.name;
            });

            const repoNamesStr = repoNames.join("\n");

            fs.writeFile("repos.txt", repoNamesStr, function (err) {
                if (err) {
                    throw err;
                }

                console.log(`Saved ${repoNames.length} repos`);
            });
        });
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