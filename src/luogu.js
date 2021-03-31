const request = require('request-promise');
// const vscode = require('vscode');
const luogu_difficulty = ["暂无评定", "入门", "普及-", "普及/提高-", "普及+/提高", "提高+/省选-", "省选/NOI-", "NOI/NOI+/CTSC"];
const luogu_tags = ["!", "模拟", "字符串", "动态规划,动规,dp", "搜索", "数论,数学", "图论", "贪心", "计算几何", "暴力数据结构", "高精", "树形结构", "递推", "博弈论", "1997", "1998", "1999", "2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "重庆", "四川","河南","莫队","线段树","倍增","线性结构","二分答案","USACO","并查集","各省省选","点分治","平衡树","二叉堆","WC/CTSC/集训队","树状数组","递归","最大匹配","单调队列","POI","2021","2022","2023","2024","2025","!","!","!","!","!","!","!","福建省历届夏令营","矩阵运算","整数研究","!","!","!","!","NOI系列","离散化","网络流","!","洛谷原创","NOIp普及组","NOIp提高组","NOIp初赛","APIO","!","!","浙江","上海","福建","江苏","安徽","湖南","北京","河北","广东","山东","吉林","NOI导刊","cdq分治","后缀自动机,SAM","IOI","!","!","!","!","!","!","!","基础算法","枚举,暴力","分治","排序","冒泡排序","选择排序","桶排","插入排序","归并排序","快速排序,快排","堆排序","希尔排序","外部排序","查找算法","顺序查找","二分查找",""];

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
    if (page_number < data.currentData.problems.count / 50) {
        arr.push({
            label: "下一页",
            description: "第" + (page_number + 1) + "页"
        })
    }
    for (var i = 0, len = data.currentData.problems.result.length; i < len; i++) {
        let t = {};
        t.label = data.currentData.problems.result[i].title;
        t.description = data.currentData.problems.result[i].pid;
        t.detail = data.currentData.problems.result[i].totalAccepted + '/' + data.currentData.problems.result[i].totalSubmit + ' ' + luogu_difficulty[data.currentData.problems.result[i].difficulty];
        for (var j = 0; j < data.currentData.problems.result[i].tags.length; j++) {
            t.detail = t.detail + ' ' + luogu_tags[data.currentData.problems.result[i].tags[j]];
        }
        arr.push(t);
    }
    return arr;
}
exports.GetLuoguApi = GetLuoguApi;
exports.RankingList = RankingList;
exports.Problemslist = Problemslist;