const request = require('request')

const config = require('./config');


var __main = function() {
    let url = 'https://jwxt.gdupt.edu.cn/login!doLogin.action'
    var encryption = Buffer.from(config.pwd).toString('base64')

    let headers = {
        'User-Agent': `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36`,
    }
    // POST 发送的数据
    let data = {
        account: config.account,
        pwd: encryption,
        verifycode: '',
    }

    let options = {
        method: 'POST',
        url: url,
        headers: headers,
        form: data,
    }

    // 模拟登陆
    request(options, function(error, response, body){
        let cookieGetFromBroswer = response.headers['set-cookie']
        let cookie = cookieGetFromBroswer[0].split(' ')[0]

        headers['Cookie'] = cookie
        // 获得 cookie 再请求一次
        request(options, function(error, response, body){
            // 获取成绩
            if (config.getScoreData == true) {
                const getScoreData = require('./getScoreData')
                getScoreData.getScoreData(headers)
            }
            // 获取课表
            if (config.getListData == true) {
                const getListData = require('./getListData')
                getListData.getListData(cookie)
            }
        })
    })
}


__main()
