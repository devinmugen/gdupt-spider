const request = require('request')

const log = function() {
    console.log.apply(console, arguments)
}

var __getScoreData = function(headers) {
    // 获取成绩的 API
    const url = 'https://jwxt.gdupt.edu.cn/xskccjxx!getDataList.action'

    // 发送的数据
    // 先设置 page 为 1, 再获取得到的数据下的 total 值，再计算需要请求几次(每次请求20 rows)
    // 其他的数据为网站默认
    // xnxqdm: '202101' 可以获取这个学期的分数
    // xnxqdm: '' 可以获取全部分数
    var data = {
        xnxqdm: '',
        page: '1',
        rows: '20',
        sort: 'xnxqdm,kcbh,ksxzdm',
        order: 'asc',
    }
    const options = {
        url: url,
        method: 'POST',
        headers: headers,
        form: data,
    }
    //
    requestScore(options, function(subjectsSum){
        j = subjectsSum / 20
        for (var i = 1; i < j; i++) {
            // 改变 data 页数
            data.page = i + 1
            requestScore(options, function(){})
        }
    })
}

var requestScore = function(options, callback) {

    request(options, function(error, response, body) {
        if (error === null && response.statusCode == 200) {
            const utils = require('./utils')
            const path = 'scoreData.txt'
            // 将 body 从 string 转为 JSON
            var scoreData = JSON.parse(body)
            // 保存数据
            utils.saveJSON(path, scoreData)
            // 获得总数
            subjectsSum = scoreData.total

            // 回调函数
            callback(subjectsSum)
            log('--- 获取成功')
        } else {
            log(' score *** ERROR 请求失败 ', error)
        }
    })
}

exports.getScoreData = __getScoreData
