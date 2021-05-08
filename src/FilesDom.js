const fs = require('fs');
const path = require('path');
const showdown =require('showdown');
const converter = new showdown.Converter();
const preview_style=fs.readFileSync(path.resolve(__dirname,'..','resources','css','markdown.css'));
const problem_style=fs.readFileSync(path.resolve(__dirname,'..','resources','css','problem.css'));
const user_style=fs.readFileSync(path.resolve(__dirname,'..','resources','css','user.css'));
function GetUserTemplate(uid,data) {
    let introduction_html=converter.makeHtml(data.currentData.user.introduction)
    return `
    <!DOCTYPE html>
    <html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script type="text/x-mathjax-config">
                MathJax.Hub.Config({
                tex2jax: {
                inlineMath: [ ['$','$'],['$$','$$'] ],
                processEscapes: true
                }
                });
            </script>
        <script src="http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=default"></script>
        <script src="https://cdn.jsdelivr.net/npm/clipboard@2.0.8/dist/clipboard.min.js"></script>
        <style>
            ${preview_style}
        </style>
        <style>
            ${user_style}
        </style>
    </head>

    <body>
        <div class="background">
            <img src="${data.currentData.user.background}" class="background_img">
        </div>
        <br>
        <div class="layout">
            <div class="introduction">
            ${introduction_html}
            </div>
        </div>
        
    </body>

    </html>
    `
}
exports.GetUserTemplate = GetUserTemplate;
function GetProblemTemplate(pid,data) {
    let background_html=converter.makeHtml(data.currentData.problem.background);
    let description_html=converter.makeHtml(data.currentData.problem.description);
    let inputFormat_html=converter.makeHtml(data.currentData.problem.inputFormat);
    let outputFormat_html=converter.makeHtml(data.currentData.problem.outputFormat);
    let hint_html=converter.makeHtml(data.currentData.problem.hint);
    
    let min_time_limit=Math.min(...data.currentData.problem.limits.time);
    let max_time_limit=Math.max(...data.currentData.problem.limits.time);
    let min_memory_limit=Math.min(...data.currentData.problem.limits.memory);
    let max_memory_limit=Math.max(...data.currentData.problem.limits.memory);
    return `
    <!DOCTYPE html>
    <html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script type="text/x-mathjax-config">
                    MathJax.Hub.Config({
                    tex2jax: {
                    inlineMath: [ ['$','$'],['$$','$$'] ],
                    processEscapes: true
                    }
                    });
                </script>
        <script src="http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=default"></script>
        <script src="https://cdn.jsdelivr.net/npm/clipboard@2.0.8/dist/clipboard.min.js"></script>
        <style>
            ${preview_style}
        </style>
        <style>
            ${problem_style}
        </style>
    </head>

    <body>
        <br />
        <h1>${pid+' '+data.currentTitle}</h1>
        <div class="information">
            <div class="problem_information">
                提交<br />
                ${data.currentData.problem.totalSubmit}
            </div>
            <div class="problem_information">
                通过<br />${data.currentData.problem.totalAccepted}
            </div>
            <div class="problem_information">
                时间限制<br />
                ${min_time_limit==max_time_limit?`${min_time_limit/1000}s`:`${min_time_limit/1000}s~${max_time_limit/1000}s`}
            </div>
            <div class="problem_information">
                内存限制<br />
                ${min_memory_limit==max_memory_limit?`${min_memory_limit/1024}MB`:`${min_memory_limit/1024}MB~${max_memory_limit/1024}MB`}
            </div>
        </div>
        <br />
        <div class="wantsTranslation">
            ${data.currentData.problem.wantsTranslation?`<blockquote><p><strong>本题征求翻译。</strong>如果您能提供翻译或者题意简述，请<a href="https://www.luogu.com.cn/problem/${pid}#translate">提交翻译</a>，感谢您的贡献。</p></blockquote>`:``}
        </div>
        <br/>
        <div class="layout">
            <div id="background">
                <br />
                <h2><strong>题目背景</strong></h2>
                <br />
                ${background_html}
            </div>
            <div id="description">
                <br />
                <h2><strong>题目描述</strong></h2>
                <br />
                ${description_html}
            </div>
            <div id="inputFormat">
                <br />
                <h2><strong>输入格式</strong></h2>
                <br />
                ${inputFormat_html}
            </div>
            <div id="outputFormat">
                <br />
                <h2><strong>输出格式</strong></h2>
                <br />
                ${outputFormat_html}
            </div>
            <div id="samples">
                <br />
                <h2><strong>输入输出样例</strong></h2>
                <br />
                ${data.currentData.problem.samples[0]?'<h3>#1</h3><pre class="inputFormat"><code>'+data.currentData.problem.samples[0][0]+'</code></pre><pre class="outputFormat"><code>'+data.currentData.problem.samples[0][1]+'</code></pre>':''}
                ${data.currentData.problem.samples[1]?'<h3>#2</h3><pre class="inputFormat"><code>'+data.currentData.problem.samples[1][0]+'</code></pre><pre class="outputFormat"><code>'+data.currentData.problem.samples[1][1]+'</code></pre>':''}
                ${data.currentData.problem.samples[2]?'<h3>#3</h3><pre class="inputFormat"><code>'+data.currentData.problem.samples[2][0]+'</code></pre><pre class="outputFormat"><code>'+data.currentData.problem.samples[2][1]+'</code></pre>':''}
            </div>
            <div id="hint">
                <br />
                <h2><strong>说明/提示</strong></h2>
                <br />
                ${hint_html}
            </div>
        </div>
        <br/>
        <!-- <div class="float-button"></div> -->
    </body>

    </html>
    `
}
exports.GetProblemTemplate = GetProblemTemplate;