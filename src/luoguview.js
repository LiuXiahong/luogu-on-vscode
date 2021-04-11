const vscode=require('vscode');
function ShowProblem(pid)
{
    vscode.window.showInformationMessage(pid, 'Yes', 'No');
    return;
}
function ShowUser(uid)
{
    vscode.window.showInformationMessage(uid, 'Yes', 'No');
}
exports.ShowProblem=ShowProblem;
exports.ShowUser=ShowUser;