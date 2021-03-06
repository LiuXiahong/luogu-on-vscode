const vscode = require('vscode');
const luogu = require('./luogu');
const luoguview = require('./webview');
const sd = require('silly-datetime');

const unicode = {
    /**
     * @param {string} str A string
     * @returns {string} A string
     */
    string_unicode: function (str) {
        var ret = "";
        for (var i = 0; i < str.length; i++) {
            ret += "\\u" + str.charCodeAt(i).toString(16);
        }
        return ret;
    }
}
exports.unicode = unicode;

const Console = {
    Log: function (data) {
        var time = sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
        console.log(`[${time}] ${data}`);
    },
    Error: function (data) {
        var time = sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
        console.error(`[${time}] ${data}`);
    }
}
exports.Console=Console;

function ShowRankingList(page_number) {
    let url = 'https://www.luogu.com.cn/ranking?_contentOnly';
    vscode.window.showQuickPick(luogu.GetLuoguApi(url, page_number, luogu.RankingList)).then(value => {
        if (value != undefined && value.uid != null) {
            luoguview.ShowUser(String(value.uid));
        }
        if (value.label == "上一页") {
            ShowRankingList(page_number - 1);
        }
        else if (value.label == "下一页") {
            ShowRankingList(page_number + 1);
        }
    });
    return;
}
exports.ShowRankingList = ShowRankingList;

function SearchProblems(keyword, page_number) {
    let url = 'https://www.luogu.com.cn/problem/list?_contentOnly&keyword=' + keyword;
    vscode.window.showQuickPick(luogu.GetLuoguApi(url, page_number, luogu.ProblemsList)).then(value => {
        if (value != undefined && value.pid != null) {
            luoguview.ShowProblem(value.pid);
        }
        if (value.label == "上一页") {
            SearchProblems(keyword, page_number - 1);
        }
        else if (value.label == "下一页") {
            SearchProblems(keyword, page_number + 1);
        }
    });
    return;
}
exports.SearchProblems = SearchProblems;

function SearchTrainings(keyword, type, page_number) {
    let url = 'https://www.luogu.com.cn/training/list?keyword=' + keyword + '&_contentOnly';
    if (type == 'official') {
        url = url + '&type=official';
    }
    else {
        url = url + '&type=select'
    }
    vscode.window.showQuickPick(luogu.GetLuoguApi(url, page_number, luogu.TrainingsList)).then(value => {
        if (value != undefined && value.id != null) {
            SearchProblemListInTraining(value.id);
        }
        if (value.label == "上一页") {
            SearchTrainings(keyword, type, page_number - 1);
        }
        else if (value.label == "下一页") {
            SearchTrainings(keyword, type, page_number + 1);
        }

    });
    return;
}
exports.SearchTrainings = SearchTrainings;

function SearchUsers(keyword) {
    let url = 'https://www.luogu.com.cn/api/user/search?keyword=' + keyword;
    vscode.window.showQuickPick(luogu.GetLuoguApi(url, null, luogu.UsersList)).then(value => {
        if (value != undefined && value.uid != null) {
            luoguview.ShowUser(value.uid);
        }
    });
    return;
}
exports.SearchUsers = SearchUsers;

function SearchProblemListInTraining(id) {
    let url = 'https://www.luogu.com.cn/training/' + id + '?_contentOnly';
    vscode.window.showQuickPick(luogu.GetLuoguApi(url, null, luogu.ProblemsListInTraining)).then(value => {
        if (value != undefined && value.pid != null) {
            luoguview.ShowProblem(value.pid);
        }
    });
    return;
}
exports.SearchProblemListInTraining = SearchProblemListInTraining;