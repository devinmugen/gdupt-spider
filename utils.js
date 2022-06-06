const _saveJSON = function(path, listData) {
    const fs = require('fs')
    const s = JSON.stringify(listData, null, 2)
    fs.appendFile(path, s , function(error) {
        if (error !== null) {
            console.log('*** 写入文件错误', error)
        } else {
            console.log('--- 保存成功')
        }
    })
}


exports.saveJSON = _saveJSON
