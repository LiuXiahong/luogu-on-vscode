// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
var pass_json;

function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "luogu-on-vscode" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let helloWorld = vscode.commands.registerCommand('luogu-on-vscode.helloWorld', function () {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from luogu-on-vscode!');
	});
	let showranking = vscode.commands.registerCommand('luogu-on-vscode.showranking', function () {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		var arr = [{
			label: 'first',
			description: 'first item',
			detail: 'first item details'
		}, {
			label: 'second',
			description: 'second item',
			detail: 'second item details'
		}];
		getLuoguApi('https://www.luogu.com.cn/problem/list?_contentOnly');
		vscode.window.showQuickPick(arr).then(value => {
			vscode.window.showInformationMessage('User choose ' + value.label);
		})
	});
	context.subscriptions.push(helloWorld);
	context.subscriptions.push(showranking);
}

exports.activate = activate;

var fs = require('fs');
function getLuoguApi(url) {
	const request = require('request');
	request(url, { json: true }, (err, res,
		body) => {
		if (err) { return console.log(err); }
		console.log(body.code);
		// console.log(body);
		// return body;
	});
}
// this method is called when your extension is deactivated
function deactivate() { }

module.exports = {
	activate,
	deactivate
}
