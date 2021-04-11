const vscode = require('vscode');
const luogu = require('./luogu');
const luoguview=require('./luoguview');
function ShowRankingList(page_number) {
    let url = 'https://www.luogu.com.cn/ranking?_contentOnly';
    vscode.window.showQuickPick(luogu.GetLuoguApi(url, page_number, luogu.RankingList)).then(value => {
        if (value != undefined) {
            if (value.label == "上一页") {
                ShowRankingList(page_number - 1);
            }
            else if (value.label == "下一页") {
                ShowRankingList(page_number + 1);
            }
            else {
                luoguview.ShowUser(value.uid);
            }
        }
    });
    return;
}
function SearchProblems(keyword, page_number) {
    let url = 'https://www.luogu.com.cn/problem/list?_contentOnly&keyword=' + keyword;
    vscode.window.showQuickPick(luogu.GetLuoguApi(url, page_number, luogu.ProblemsList)).then(value => {
        if (value != undefined) {
            if (value.label == "上一页") {
                SearchProblems(keyword, page_number - 1);
            }
            else if (value.label == "下一页") {
                SearchProblems(keyword, page_number + 1);
            }
            else {
                luoguview.ShowProblem(pid);
            }
        }
    });
    return;
}
function SearchProblemsSets(keyword, type, page_number) {
    let url = 'https://www.luogu.com.cn/training/list?keyword=' + keyword + '&_contentOnly';
    if (type == 'official') {
        url = url + '&type=official';
    }
    else {
        url = url + '&type=select'
    }
    vscode.window.showQuickPick(luogu.GetLuoguApi(url, page_number, luogu.ProblemsSetsList)).then(value => {
        if (value != undefined) {
            if (value.label == "上一页") {
                SearchProblemsSets(keyword, type, page_number - 1);
            }
            else if (value.label == "下一页") {
                SearchProblemsSets(keyword, type, page_number + 1);
            }
            else {
                ShowProblemListInTraining(value.id);
            }
        }
    });
    return;
}
function ShowProblemListInTraining(id) {
    let url = 'https://www.luogu.com.cn/training/' + id + '?_contentOnly';
    vscode.window.showQuickPick(luogu.GetLuoguApi(url, -1, luogu.ProblemsListInTraining)).then(value => {
        if (value != undefined) {
            vscode.window.showInformationMessage(value.label, 'Yes', 'No');
        }
    });
    return;
}
exports.ShowRankingList = ShowRankingList;
exports.SearchProblems = SearchProblems;
exports.SearchProblemsSets = SearchProblemsSets;
exports.ShowProblemListInTraining = ShowProblemListInTraining;