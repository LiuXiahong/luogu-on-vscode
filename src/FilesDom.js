const fs = require('fs');
const luogu=require('./luogu');
function GetUserTemplate(uid) {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Cat Coding</title>
    </head>
    <body>
        <p>${uid}</p>
    </body>
    </html>
    `
}
exports.GetUserTemplate = GetUserTemplate;
function GetProblemTemplate(pid) {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Cat Coding</title>
    </head>
    <body>
        <p>${pid}</p>
    </body>
    </html>
    `
}
exports.GetProblemTemplate = GetProblemTemplate;