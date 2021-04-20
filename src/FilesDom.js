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
    let inputFormat_html=converter.makeHtml(data.currentData.problem.inputFormat);
    let outputFormat_html=converter.makeHtml(data.currentData.problem.outputFormat);
    let hint_html=converter.makeHtml(data.currentData.problem.hint);
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
            html,
            body {
                font-family:var('Microsoft YaHei')
                font-size: var(13px);
                padding: 0 26px;
                line-height: var(22px);
                word-wrap: break-word;
            }

            body {
                padding-top: 1em;
            }

            /* Reset margin top for elements */
            h1,
            h2,
            h3,
            h4,
            h5,
            h6,
            p,
            ol,
            ul,
            pre {
                margin-top: 0;
            }

            h2,
            h3,
            h4,
            h5,
            h6 {
                font-weight: normal;
                margin-bottom: 0.2em;
            }

            #code-csp-warning {
                position: fixed;
                top: 0;
                right: 0;
                color: white;
                margin: 16px;
                text-align: center;
                font-size: 12px;
                font-family: sans-serif;
                background-color: #444444;
                cursor: pointer;
                padding: 6px;
                box-shadow: 1px 1px 1px rgba(0, 0, 0, .25);
            }

            #code-csp-warning:hover {
                text-decoration: none;
                background-color: #007acc;
                box-shadow: 2px 2px 2px rgba(0, 0, 0, .25);
            }

            body.scrollBeyondLastLine {
                margin-bottom: calc(100vh - 22px);
            }

            body.showEditorSelection .code-line {
                position: relative;
            }

            body.showEditorSelection .code-active-line:before,
            body.showEditorSelection .code-line:hover:before {
                content: "";
                display: block;
                position: absolute;
                top: 0;
                left: -12px;
                height: 100%;
            }

            body.showEditorSelection li.code-active-line:before,
            body.showEditorSelection li.code-line:hover:before {
                left: -30px;
            }

            .vscode-light.showEditorSelection .code-active-line:before {
                border-left: 3px solid rgba(0, 0, 0, 0.15);
            }

            .vscode-light.showEditorSelection .code-line:hover:before {
                border-left: 3px solid rgba(0, 0, 0, 0.40);
            }

            .vscode-light.showEditorSelection .code-line .code-line:hover:before {
                border-left: none;
            }

            .vscode-dark.showEditorSelection .code-active-line:before {
                border-left: 3px solid rgba(255, 255, 255, 0.4);
            }

            .vscode-dark.showEditorSelection .code-line:hover:before {
                border-left: 3px solid rgba(255, 255, 255, 0.60);
            }

            .vscode-dark.showEditorSelection .code-line .code-line:hover:before {
                border-left: none;
            }

            .vscode-high-contrast.showEditorSelection .code-active-line:before {
                border-left: 3px solid rgba(255, 160, 0, 0.7);
            }

            .vscode-high-contrast.showEditorSelection .code-line:hover:before {
                border-left: 3px solid rgba(255, 160, 0, 1);
            }

            .vscode-high-contrast.showEditorSelection .code-line .code-line:hover:before {
                border-left: none;
            }

            img {
                max-width: 100%;
                max-height: 100%;
                border-radius: 3px;
            }

            a {
                text-decoration: none;
            }

            a:hover {
                text-decoration: underline;
            }

            a:focus,
            input:focus,
            select:focus,
            textarea:focus {
                outline: 1px solid -webkit-focus-ring-color;
                outline-offset: -1px;
            }

            p {
                margin-bottom: 0.7em;
            }

            ul,
            ol {
                margin-bottom: 0.7em;
            }

            hr {
                border: 0;
                height: 2px;
                border-bottom: 2px solid;
            }

            h1 {
                padding-bottom: 0.3em;
                line-height: 1.2;
                border-bottom-width: 1px;
                border-bottom-style: solid;
                font-weight: normal;
            }

            table {
                border-collapse: collapse;
            }

            th {
                text-align: left;
                border-bottom: 1px solid;
            }

            th,
            td {
                padding: 5px 10px;
            }

            table>tbody>tr+tr>td {
                border-top: 1px solid;
            }

            blockquote {
                margin: 0 7px 0 5px;
                padding: 0 16px 0 10px;
                border-left-width: 5px;
                border-left-style: solid;
            }

            code {
                font-family: var(--vscode-editor-font-family);
                font-size: 1em;
                line-height: 1.357em;
            }

            body.wordWrap pre {
                white-space: pre-wrap;
            }

            pre:not(.hljs),
            pre.hljs code>div {
                padding: 16px;
                border-radius: 3px;
                overflow: auto;
            }

            pre code {
                color: var(--vscode-editor-foreground);
                tab-size: 4;
            }

            /** Theming */

            .vscode-light pre {
                background-color: rgba(220, 220, 220, 0.4);
            }

            .vscode-dark pre {
                background-color: rgba(10, 10, 10, 0.4);
            }

            .vscode-high-contrast pre {
                background-color: rgb(0, 0, 0);
            }

            .vscode-high-contrast h1 {
                border-color: rgb(0, 0, 0);
            }

            .vscode-light th {
                border-color: rgba(0, 0, 0, 0.69);
            }

            .vscode-dark th {
                border-color: rgba(255, 255, 255, 0.69);
            }

            .vscode-light h1,
            .vscode-light hr,
            .vscode-light td {
                border-color: rgba(0, 0, 0, 0.18);
            }

            .vscode-dark h1,
            .vscode-dark hr,
            .vscode-dark td {
                border-color: rgba(255, 255, 255, 0.18);
            }
        </style>
    </head>

    <body>
        <h1>${pid+' '+data.currentTitle}</h1>
        <div id="background">
            <h2>题目背景</h2>
            ${background_html}
        </div>
        <hr/>
        <div id="description">
            <h2>题目描述</h2>
            ${description_html}
        </div>
        <hr/>
        <div id="inputFormat">
            <h2>输入格式</h2>
            ${inputFormat_html}
        </div>
        <hr/>
        <div id="outputFormat">
            <h2>输出格式</h2>
            ${outputFormat_html}
        </div>
        <hr/>
        <div id="samples">
            <h2>输入输出样例</h2>
        </div>
        <hr/>
        <div id="hint">
            <h2>说明/提示</h2>
            ${hint_html}
        </div>
    </body>

    </html>
    `
}
exports.GetProblemTemplate = GetProblemTemplate;