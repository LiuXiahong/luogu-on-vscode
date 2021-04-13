const vscode=require('vscode');
const CustomFunction=require('./customfunction');
async function ShowProblem(pid)
{
    await vscode.window.showInformationMessage(pid, 'Yes', 'No');
}
async function ShowUser(uid)
{
    await vscode.window.showInformationMessage(uid, 'Yes', 'No');
}
exports.ShowProblem=ShowProblem;
exports.ShowUser=ShowUser;