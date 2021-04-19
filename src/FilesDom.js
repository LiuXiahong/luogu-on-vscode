const fs = require('fs');
const showdown =require('showdown');
function GetUserTemplate(uid,data) {
    return `
    <!DOCTYPE html>
    <html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>

    <body>
        <div id="background">
        </div>
    </body>

</html>
    `
}
exports.GetUserTemplate = GetUserTemplate;
function GetProblemTemplate(pid,data) {
    let converter = new showdown.Converter();
    let background_html=converter.makeHtml(data.currentData.problem.background);
    let description_html=converter.makeHtml(data.currentData.problem.description);
    return `
    <!DOCTYPE html>
    <html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>

    <body>
        <h1>${pid}</h1>
        <div id="background">
            <h2>题目背景</h2>
            ${background_html}
        </div>
        <div id="description">
            <h2>题目描述</h2>
        </div>
        <div id="inputFormat">
            <h2>输入格式</h2>
        </div>
        <div id="outputFormat">
            <h2>输出格式</h2>
        </div>
        <div id="samples">
            <h2>输入输出样例</h2>
        </div>
        <div id="hint">
            <h2>说明/提示</h2>
        </div>
    </body>

    </html>
    `
}
exports.GetProblemTemplate = GetProblemTemplate;