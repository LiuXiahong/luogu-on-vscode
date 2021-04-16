const vscode = require('vscode');
const CustomFunction = require('./customfunction');
const FilesDom=require('./FilesDom');
async function ShowProblem(pid) {
    // await vscode.window.showInformationMessage(String(pid), 'Yes', 'No');
    const panel = vscode.window.createWebviewPanel('problem information','题目详情',vscode.ViewColumn.Two,{});
    panel.webview.html=FilesDom.GetUserTemplate(String(pid));
}
exports.ShowProblem = ShowProblem;

async function ShowUser(uid) {
    // await vscode.window.showInformationMessage(String(uid), 'Yes', 'No');
    const panel = vscode.window.createWebviewPanel('user information','用户详情',vscode.ViewColumn.Two,{});
    panel.webview.html=FilesDom.GetUserTemplate(String(uid));
}
exports.ShowUser = ShowUser;