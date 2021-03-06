const vscode = require('vscode');
const FilesDom=require('./FilesDom');
const luogu=require('./luogu');
async function ShowProblem(pid) {
    var data=await luogu.GetLuoguApi('https://www.luogu.com.cn/problem/'+pid+'?_contentOnly',null,null);
    const panel = vscode.window.createWebviewPanel('problem information','题目详情:'+pid,vscode.ViewColumn.Two,{
        enableScripts: true
    });
    panel.webview.html=FilesDom.GetProblemTemplate(String(pid),data);
}
exports.ShowProblem = ShowProblem;

async function ShowUser(uid) {
    var data=await luogu.GetLuoguApi('https://www.luogu.com.cn/user/'+uid+'?_contentOnly',null,null);
    const panel = vscode.window.createWebviewPanel('user information','用户详情:'+uid,vscode.ViewColumn.Two,{
        enableScripts: true
    });
    panel.webview.html=FilesDom.GetUserTemplate(String(uid),data);
}
exports.ShowUser = ShowUser;