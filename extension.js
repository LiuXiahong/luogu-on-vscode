// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const request = require('request-promise');
const child_process = require('child_process');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "luogu-on-vscode" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let start = vscode.commands.registerCommand('luogu-on-vscode.start', function () {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from luogu-on-vscode!');
	});
	let showranking = vscode.commands.registerCommand('luogu-on-vscode.showranking', function () {
		// The code you place here will be executed every time your command is executed

		var num = vscode.workspace.getConfiguration().get('luogu-on-vscode.rankingListPageNumber');
		vscode.window.showQuickPick(getRankingList(num), {
			canPickMany: false,
			ignoreFocusOut: true,
			matchOnDescription: true,
			matchOnDetail: true,
			placeHolder: '咕值列表'
		}).then(value => {
			vscode.window.showInformationMessage("看看人家" + value.name + ",再看看你自己！", '是', '否').then(result => {
				if (result == '是') {
					openLuoguUrl(value.url);
				}
			});
		})
	});
	let search = vscode.commands.registerCommand('luogu-on-vscode.search', function () {
		// vscode.window.showQuickPick(["题目", "题单", "比赛", "用户"]).then(value => {
		// 	if (value == '题目') {
		// 		vscode.window.showInputBox({
		// 			password: false,
		// 			ignoreFocusOut: true,
		// 			placeHolder: '题目列表'
		// 		}).then(function (keyword) {
		// 			showProblemList(keyword, 1);
		// 		});

		// 	}

		// })
		vscode.window.showInputBox({
			password: false,
			ignoreFocusOut: true,
			placeHolder: '题目列表'
		}).then(function (keyword) {
			showProblemList(keyword, 1);
		});
	});
	context.subscriptions.push(start);
	context.subscriptions.push(showranking);
	context.subscriptions.push(search);
}

exports.activate = activate;

async function getRankingList(number) {
	var arr = [];
	var flag = 1;
	for (var k = 1; k <= number; k++) {
		let options = {
			method: 'GET',
			uri: String('https://www.luogu.com.cn/ranking?_contentOnly&page=' + k)
		};
		let data = await request(options);
		let body = JSON.parse(data);
		for (var i = 0, len = body.currentData.rankList.result.length; i < len; i++) {
			var t = {};
			t.label = '#' + flag + ' ' + body.currentData.rankList.result[i].user.name;
			t.description = body.currentData.rankList.result[i].user.slogan;
			t.detail = String(body.currentData.rankList.result[i].rating + ' ' + body.currentData.rankList.result[i].basicRating + ' ' + body.currentData.rankList.result[i].socialRating + ' ' + body.currentData.rankList.result[i].contestRating + ' ' + body.currentData.rankList.result[i].practiceRating + ' ' + body.currentData.rankList.result[i].prizeRating);
			t.name = body.currentData.rankList.result[i].user.name;
			t.url = String('https://www.luogu.com.cn/user/' + body.currentData.rankList.result[i].user.uid);
			arr.push(t);
			flag++;
		}
	}
	return Promise.resolve(arr);
}
async function showProblemList(keyword, number) {
	var arr = [];
	let options = {
		method: 'GET',
		uri: String('https://www.luogu.com.cn/problem/list?_contentOnly&keyword=' + keyword + '&page=' + 1)
	};
	let data = await request(options);
	let body = JSON.parse(data);
	for (var i = 0, len = body.currentData.problems.result.length; i < len; i++) {
		var t = {};
		t.label = String(body.currentData.problems.result[i].pid + ' ' + body.currentData.problems.result[i].title);
		t.name = body.currentData.problems.result[i].pid;
		t.description = body.currentData.problems.result[i].difficulty;
		t.detail = body.currentData.problems.result[i].totalAccepted + '/' + body.currentData.problems.result[i].totalSubmit;
		console.log(t);
		arr.push(t);
	}
	console.log(arr);
	vscode.window.showQuickPick(arr).then(value => {
		console.log(value);
	});
}


function openLuoguUrl(url) {
	// 判断平台
	switch (process.platform) {
		// Mac 使用open
		case "darwin":
			child_process.spawn('open', [url]);
			break;
		// Windows使用start
		case "win32":
			child_process.spawn('start', [url]);
			break;
		// Linux等使用xdg-open
		default:
			child_process.spawn('xdg-open', [url]);
	}
};

// this method is called when your extension is deactivated
function deactivate() {
	// vscode.window.showInformationMessage('GoodBye!');
}

module.exports = {
	activate,
	deactivate
}
