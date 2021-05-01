const fs = require('fs');
const path = require('path');
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
    let inputFormat_html=converter.makeHtml(data.currentData.problem.inputFormat);
    let outputFormat_html=converter.makeHtml(data.currentData.problem.outputFormat);
    let hint_html=converter.makeHtml(data.currentData.problem.hint);
    let preview_style=fs.readFileSync(path.resolve(__dirname,'..','resources','html','markdown.css'));
    return `
    <!DOCTYPE html>
    <html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script type="text/x-mathjax-config">
            MathJax.Hub.Config({
            tex2jax: {
            inlineMath: [ ['$','$'], ["\\(","\\)"] ],
            processEscapes: true
            }
            });
        </script>
        <script type="text/javascript" src="http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=default"></script>
        <style>
            ${preview_style}
        </style>
    </head>
    <body>
        <br/>
        <h1>${pid+' '+data.currentTitle}</h1>
        <div id="background">
        <br/>
            <h2><strong>题目背景</strong></h2>
            <br/>
            ${background_html}
        </div>
        <div id="description">
        <br/>
            <h2><strong>题目描述</strong></h2>
            <br/>
            ${description_html}
        </div>
        <div id="inputFormat">
        <br/>
            <h2><strong>输入格式</strong></h2>
            <br/>
            ${inputFormat_html}
        </div>
        <div id="outputFormat">
        <br/>
            <h2><strong>输出格式</strong></h2>
            <br/>
            ${outputFormat_html}
        </div>
        <div id="samples">
        <br/>
            <h2><strong>输入输出样例</strong></h2>
            <br/>
            ${data.currentData.problem.samples[0]?'<strong>#1</strong><br/><pre><code>'+data.currentData.problem.samples[0][0]+'</code></pre><pre><code>'+data.currentData.problem.samples[0][1]+'</code></pre>':''}
            ${data.currentData.problem.samples[1]?'<strong>#1</strong><br/><pre><code>'+data.currentData.problem.samples[1][0]+'</code></pre><pre><code>'+data.currentData.problem.samples[1][1]+'</code></pre>':''}
            ${data.currentData.problem.samples[2]?'<strong>#1</strong><br/><pre><code>'+data.currentData.problem.samples[2][0]+'</code></pre><pre><code>'+data.currentData.problem.samples[2][1]+'</code></pre>':''}
        </div>
        <div id="hint">
        <br/>
            <h2><strong>说明/提示</strong></h2>
            <br/>
            ${hint_html}
        </div>
    </body>

    </html>
    `
}
exports.GetProblemTemplate = GetProblemTemplate;