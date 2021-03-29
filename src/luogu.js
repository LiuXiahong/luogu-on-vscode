const request = require('request-promise');
// const vscode = require('vscode');
const luogu_difficulty = ["暂无评定", "入门", "普及-", "普及/提高-", "普及+/提高", "提高+/省选-", "省选/NOI-", "NOI/NOI+/CTSC"];


async function GetLuoguApi(src, page_number, parse_function) {
    let data_url = src + page_number;
    let options = {
        method: 'GET',
        uri: data_url
    };
    console.log('Get data from ' + data_url + ' ...');
    let data = await request(options);
    data = JSON.parse(data);
    console.log('Get data succesfully!');
    let parse_data = parse_function(page_number, data);
    return Promise.resolve(parse_data);
}
function RankingList(page_number, data) {
    let arr = [];
    let flag = (page_number - 1) * 50 + 1;
    if (page_number > 1) {
        arr.push({
            label: "上一页",
            description: "第" + (page_number - 1) + "页"
        });
    }
    arr.push({
        label: "下一页",
        description: "第" + (page_number + 1) + "页"
    })
    for (var i = 0, len = data.currentData.rankList.result.length; i < len; i++) {
        let t = {};
        t.label = '#' + flag + ' ' + data.currentData.rankList.result[i].user.name;
        t.description = data.currentData.rankList.result[i].user.slogan;
        t.detail = String(data.currentData.rankList.result[i].rating + ' ' + data.currentData.rankList.result[i].basicRating + ' ' + data.currentData.rankList.result[i].socialRating + ' ' + data.currentData.rankList.result[i].contestRating + ' ' + data.currentData.rankList.result[i].practiceRating + ' ' + data.currentData.rankList.result[i].prizeRating);
        t.name = data.currentData.rankList.result[i].user.name;
        t.url = String('https://www.luogu.com.cn/user/' + data.currentData.rankList.result[i].user.uid);
        arr.push(t);
        flag++;
    }
    return arr;
}

function Problemslist(page_number, data) {
    let arr = [];
    if (page_number > 1) {
        arr.push({
            label: "上一页",
            description: "第" + (page_number - 1) + "页"
        });
    }
    arr.push({
        label: "下一页",
        description: "第" + (page_number + 1) + "页"
    })
    for (var i = 0, len = data.currentData.problems.result.length; i < len; i++) {
        let t = {};
        t.label = data.currentData.problems.result[i].title;
        t.description = data.currentData.problems.result[i].pid;
        // 
        t.detail = data.currentData.problems.result[i].totalAccepted + '/' + data.currentData.problems.result[i].totalSubmit + ' ' + luogu_difficulty[data.currentData.problems.result[i].difficulty];
        arr.push(t);
    }
    return arr;
}
exports.GetLuoguApi = GetLuoguApi;
exports.RankingList = RankingList;
exports.Problemslist = Problemslist;