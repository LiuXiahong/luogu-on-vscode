const request = require('request-promise');
const vscode = require('vscode');
async function GetLuoguApi(src, page_number, Beautiful_function) {
    let options = {
        method: 'GET',
        uri: String(src + page_number)
    };
    let data = await request(options);
    data = JSON.parse(data);
    console.log(data);
    let beautiful_data = Beautiful_function(page_number, data);
    return Promise.resolve(beautiful_data);
}
function RankingList(page_number, data) {
    let arr = [];
    let flag = (page_number-1)*50+1;
    if(page_number>1)
    {
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

exports.GetLuoguApi = GetLuoguApi;
exports.RankingList = RankingList;