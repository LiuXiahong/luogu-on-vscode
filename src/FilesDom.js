const fs = require('fs');
const showdown =require('showdown');
function GetUserTemplate(uid,data) {
    let converter = new showdown.Converter();
    let markdown_html=converter.makeHtml(data.currentData.problem.background);
    return `
    <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script>
        document.getElementById('background').innerHTML = '${markdown_html}';
    </script>
</head>

<body>
    <div id="background"></div>
</body>

</html>
    `
}
exports.GetUserTemplate = GetUserTemplate;
function GetProblemTemplate(pid,data) {
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