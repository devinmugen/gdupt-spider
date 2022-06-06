const request = require('request')

const config = require('./config');

const log = function() {
    console.log.apply(console, arguments)
}

var __getListData = function(cookie) {
    // 获取课表的 API
    // const url = 'http://210.38.250.43/xsgrkbcx!getDataList.action'
    const url = 'https://jwxt.gdupt.edu.cn/xsgrkbcx!getDataList.action'
    

    const useragent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36'
    const headers = {
        'Cookie': cookie,
        'User-Agent': useragent,
    }
// ------------------------
// 调参数
// ------------------------
    var data = {
        zc: '1',
        xnxqdm: config.ListSemester,
        page: '1',
        rows: '20',
        sort: 'kxh',
        order: 'asc',
    }
    // form 是发送数据
    const options = {
        url: url,
        method: 'POST',
        headers: headers,
        form: data,
    }
    // 一共 22 周
    subjectsSum = 22    
    for (var i = 1; i <= subjectsSum; i++) {
        // data.zc 为课表页数        
        requestList(options, data.zc)
        data.zc = i + 1
    }
}

var requestList = function(options, pageNo) {
    request(options, pageNo, function(error, response, body) {
        if (error === null && response.statusCode == 200) {
            const utils = require('./utils')
            path = './datalist/listData' + pageNo + '.json'
            // 将 body 从 string 转为 JSON
            var listData = JSON.parse(body)
            utils.saveJSON(path, listData)

            log('--- 成功', 'listData.total', listData.total)
        } else {
            log('*** ERROR 请求失败 ', error)
        }
    })
}

exports.getListData = __getListData
