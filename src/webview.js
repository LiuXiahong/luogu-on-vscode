const vscode = require('vscode');
const FilesDom=require('./FilesDom');
async function ShowProblem(pid) {
    const panel = vscode.window.createWebviewPanel('problem information','题目详情',vscode.ViewColumn.Two,{});
    panel.webview.html=FilesDom.GetUserTemplate(String(pid));
}
exports.ShowProblem = ShowProblem;

async function ShowUser(uid) {
    const panel = vscode.window.createWebviewPanel('user information','用户详情',vscode.ViewColumn.Two,{});
    panel.webview.html=FilesDom.GetUserTemplate(String(uid));
}
exports.ShowUser = ShowUser;