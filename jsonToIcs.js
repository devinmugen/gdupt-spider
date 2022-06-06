const request = require('request')
const fs = require('fs')

const log = function() {
    console.log.apply(console, arguments)
}

var jsonToIcs = function() {
    sbegin = 'BEGIN:VCALENDAR\n' +
        'VERSION:2.0\n' +
        'X-WR-CALNAME:课程表\n' +
        'X-APPLE-CALENDAR-COLOR:#ffdb00\n'
    // 添加课程表信息
    add(sbegin)

    // 循环导入
    for (var i = 1; i <= 22; i++) {
        const utils = require('./utils')
        path = './datalist/listData' + i + '.json'
        var list =fs.readFileSync(path, 'utf8')
        list = JSON.parse(list)
        var sum = list.total
        // log('sum', sum)
        for (var j = 0; j < sum; j++) {
            e = list.rows[j]
            s = sDeal(e)
            add(s)
        }
        console.log('hello')
        // console.log('list', list)
    }
    send = 'END:VCALENDAR\n'
    add(send)
}

// BEGIN:VEVENT
// SUMMARY:大学物理学
// DTSTART;VALUE=DATE-TIME:20160829T082000
// DTEND;VALUE=DATE-TIME:20160829T100000
// UID:c3bc4522-b890-11e6-a852-a45e60ef9ad5@CQUT
// LOCATION:1教0516
// END:VEVENT

// 传入课程名称，日期，时间
var sDeal = function(e) {
    className = e.kcmc
    location = e.jxcdmc
    data = e.pkrq.replace('-', '').replace('-', '')
    time = e.jcdm
    var dtstart = 'DTSTART;VALUE=DATE-TIME:' + data + setTimeStart(time)
    var dtend = 'DTEND;VALUE=DATE-TIME:' + data + setTimeEnd(time)
    var s = 'BEGIN:VEVENT\n' +
        'SUMMARY:' + className + '\n' +
        dtstart + '\n' +
        dtend + '\n' +
        'UID:' + data + setTimeStart(time) + '\n' +
        'LOCATION:' + location + '\n' +
        'END:VEVENT' + '\n'
    return s
}

var add = function(s) {
    path = 'datalist.ics'
    fs.appendFile(path, s , function(error) {
        if (error !== null) {
            console.log('*** 写入文件错误', error)
        } else {
            console.log('--- 保存成功')
        }
    })
}

var setTimeStart = function(time) {
    if (time == '0102') {
        return 'T080000'
    } else if (time == '0304') {
        return 'T100000'
    } else if (time == '0506') {
        return 'T143000'
    } else if (time == '0708') {
        return 'T162000'
    } else {
        return 'T193000'
    }
}

var setTimeEnd = function(time) {
    if (time == '0102') {
        return 'T094000'
    } else if (time == '0304') {
        return 'T114000'
    } else if (time == '0506') {
        return 'T161000'
    } else if (time == '0708') {
        return 'T175000'
    } else {
        return 'T211000'
    }
}

var __main = function() {
    jsonToIcs()
}

__main()
