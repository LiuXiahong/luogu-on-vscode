const vscode = require('vscode');
const luogu = require('./luogu');
function ShowRankingList(page_number) {
    vscode.window.showQuickPick(luogu.GetLuoguApi('https://www.luogu.com.cn/ranking?_contentOnly&page=', page_number,luogu.RankingList)).then(value => {
        if (value.label == "上一页") {
            ShowRankingList(page_number-1);
        }
        else if (value.label == "下一页") {
            ShowRankingList(page_number+1);
        }
        else {
            vscode.window.showInformationMessage(value.name, 'Yes', 'No');
        }
    });
    return;
}
exports.ShowRankingList=ShowRankingList;