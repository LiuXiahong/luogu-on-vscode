const vscode = require('vscode');
const CustomFunction = require('./customfunction');
const FilesDom=require('./FilesDom');
async function ShowProblem(pid) {
    await vscode.window.showInformationMessage(String(pid), 'Yes', 'No');
    const panel = vscode.window.createWebviewPanel('user information','用户详情',vscode.ViewColumn.One,{});
}
exports.ShowProblem = ShowProblem;

async function ShowUser(uid) {
    await vscode.window.showInformationMessage(String(uid), 'Yes', 'No');
}
exports.ShowUser = ShowUser;