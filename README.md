# 广东石油化工学院 信息爬虫

使用的是 JavaScript

## 爬取分数和课程表信息

### 使用方法

1. 修改 config.json

```
{
    "account": "",
    "pwd": "",
    "getScoreData": true,
    "getListData": true,
    "ListSemester": "202002"
}
```
> account: 学号
> 
> pwd: 密码
> 
> getScoreData: 是否爬取分数
> 
> getListData: 是否爬取课程表
> 
> ListSemester: 课程表的学年学期


2. 执行命令
`node main.js`

---

## 爬取到的课程表转成 ICS

> 以.ics 為後綴名的文件（在 Apple Mac 系統中使用 "iCal" 類型代碼），表示該文件包含了日曆和計劃信息。

### 使用方法

执行命令 `node jsonToIcs.js`

