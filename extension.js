// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
// const request = require('request');
const request = require('request-promise');
async function getLuoguApi(url) {
	let options = {
		method: 'GET',
		uri: url
	};
	let data = await request(options);
	data = JSON.parse(data);
	// console.log("I got data", data);
	return Promise.resolve(data);
}
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

		var arr = [];
		for (var k = 2; k >= 1; k--) {
			var body = {};
			getLuoguApi('https://www.luogu.com.cn/ranking?_contentOnly&page=' + k).then(result => {
				body = result;
				var ranking = body.currentData.rankList.result;
				for (var i = 0, len = ranking.length; i < len; i++) {
					var t = {};
					t.label = ranking[i].user.name;
					t.description = ranking[i].user.slogan;
					t.detail = String(ranking[i].contestRating + ' ' + ranking[i].socialRating + ' ' + ranking[i].practiceRating + ' ' + ranking[i].basicRating + ' ' + ranking[i].prizeRating);
					arr.push(t);
				}
			});
			// setTimeout(function () { console.log(a) }, 3000);
		}
		setTimeout(function () {
			console.log(arr);
			vscode.window.showQuickPick(arr, {
					canPickMany: false,
					ignoreFocusOut: true,
					matchOnDescription: true,
					matchOnDetail: true,
					placeHolder: body.currentTitle
				}).then(value => {
					vscode.window.showInformationMessage("看看人家" + value.label + ",再看看你自己！",'是','否').then(result =>{
						if(result=='是')
						{
							exec(`open 'https://haoji.me'`);
						}
					});
				})
		}, 5000);
	});
	let search = vscode.commands.registerCommand('luogu-on-vscode.search', function () {
		vscode.window.showQuickPick(["题目","题单","比赛","用户"]).then(value =>{
			if(value=="题目"){

			}
			if(value=="题单"){
				
			}
			if(value=="比赛"){
				
			}
			if(value=="用户"){
				
			}
		})
		
	});
	context.subscriptions.push(helloWorld);
	context.subscriptions.push(showranking);
	context.subscriptions.push(search);
}

exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() { }

module.exports = {
	activate,
	deactivate
}
