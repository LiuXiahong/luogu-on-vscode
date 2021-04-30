// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const CustomFunction = require('./customfunction');
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	// console.log('Congratulations, your extension "luogu" is now active!');
	CustomFunction.ConsoleLog('Congratulations, your extension "luogu" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	context.subscriptions.push(vscode.commands.registerCommand('luogu.Search', function () {
		vscode.window.showQuickPick(['Search Problems', 'Search Users', 'Search Problem Sets']).then(value => {
			if (value == 'Search Problems') {
				vscode.commands.executeCommand('luogu.SearchProblems');
			}
			if (value == 'Search Problem Sets') {
				vscode.commands.executeCommand('luogu.SearchProblemsSets');
			}
			if (value == 'Search Users') {
				vscode.commands.executeCommand('luogu.SearchUsers');
			}
		});
	}));
	context.subscriptions.push(vscode.commands.registerCommand('luogu.SearchProblems', function () {
		let options = {
			password: false, // 输入内容是否是密码
			ignoreFocusOut: true, // 默认false，设置为true时鼠标点击别的地方输入框不会消失
			placeHolder: '例:P1001', // 在输入框内的提示信息
			prompt: '输入关键字' // 在输入框下方的提示信息
		}
		vscode.window.showInputBox(options).then(msg => {
			if (msg != undefined) {
				CustomFunction.SearchProblems(msg, 1);
			}
		});
	}));
	context.subscriptions.push(vscode.commands.registerCommand('luogu.SearchProblemsSets', function () {
		vscode.window.showQuickPick(['官方题单', '用户题单']).then(value => {
			let options = {
				password: false, // 输入内容是否是密码
				ignoreFocusOut: true, // 默认false，设置为true时鼠标点击别的地方输入框不会消失
				placeHolder: '例', // 在输入框内的提示信息
				prompt: '输入关键字' // 在输入框下方的提示信息
			}
			vscode.window.showInputBox(options).then(keyword => {
				if (keyword != undefined) {
					CustomFunction.SearchTrainings(keyword,value=='官方题单'?'official':'select', 1);
				}
			});
		});
	}));
	context.subscriptions.push(vscode.commands.registerCommand('luogu.SearchUsers', function () {
		let options = {
			password: false, // 输入内容是否是密码
			ignoreFocusOut: true, // 默认false，设置为true时鼠标点击别的地方输入框不会消失
			placeHolder: '例：kkkc03', // 在输入框内的提示信息
			prompt: '输入关键字' // 在输入框下方的提示信息
		}
		vscode.window.showInputBox(options).then(keyword => {
			if (keyword != undefined) {
				CustomFunction.SearchUsers(keyword);
			}
		});
	}));
	context.subscriptions.push(vscode.commands.registerCommand('luogu.ShowRankingList', function () {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		// vscode.window.showInformationMessage('Hello World from luogu!');
		CustomFunction.ShowRankingList(1);
	}));
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() { }

module.exports = {
	activate,
	deactivate
}
