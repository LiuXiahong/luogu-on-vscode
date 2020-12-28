// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */

function sleep (time) {
	return new Promise((resolve) => setTimeout(resolve, time));
  }  

function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "luogu-on-vscode" is now active!');
	const request = require('request');
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
		// var a = [{
		// 	label: 'first',
		// 	description: 'first item',
		// 	detail: 'first item details'
		// }, {
		// 	label: 'second',
		// 	description: 'second item',
		// 	detail: 'second item details'
		// }];
		var arr = [];
		url = 'https://www.luogu.com.cn/ranking?_contentOnly';
		request(url, { json: true }, (err, res, body) => {
			if (err) {
				return console.log(err);
			}
			console.log(body);
			var ranking = body.currentData.rankList.result;
			for (var i = 0, len = ranking.length; i < len; i++) {
				var t = {};
				t.label = ranking[i].user.name;
				t.description = ranking[i].user.slogan;
				t.detail = String(ranking[i].contestRating+' '+ranking[i].socialRating+' '+ranking[i].practiceRating+' '+ranking[i].basicRating+' '+ranking[i].prizeRating);
				arr.push(t);
			}
			console.log(arr.length);
			vscode.window.showQuickPick(arr,{
                canPickMany:false,
                ignoreFocusOut:true,
                matchOnDescription:true,
                matchOnDetail:true,
                placeHolder:body.currentTitle
            }).then(value => {
				vscode.window.showInformationMessage("看看人家"+ value.label+",再看看你自己！");
			})
		});

	});
	context.subscriptions.push(helloWorld);
	context.subscriptions.push(showranking);
}

exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() { }

module.exports = {
	activate,
	deactivate
}
