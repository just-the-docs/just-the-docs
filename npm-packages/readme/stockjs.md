stockjs 上櫃公司股價通知小幫手
==============================

![_080614_123140_am](https://cloud.githubusercontent.com/assets/690703/3815208/4f92cb56-1cc2-11e4-9a24-e272c5e82b21.jpg)

查詢上櫃公司當日股價，並透過 ~~[mandrillapp.com](http://mandrillapp.com)~~ [SendGrid](sendgrid.com) 送出郵件通知

Setup
-----
- Install `npm install -g stockjs`
- Get a SendGrid api key [Link](https://sendgrid.com)
- Config your crontab


CLI Usage
---------

```sh
FROM_EMAIL=shih@yulun.me \
TO=xxx@mail.com,yyy@mail.com \
SENDGRID_API_KEY=YOUR_KEY \
  stockjs
```

API
---
**.stock.getTodayPrice(stockCode[, callback(stackObj)])**

**.sendmail(stockObject, config[, callback(err, result)])**

Data Source
-----------
- http://www.gretai.org.tw/web/index.php?l=zh-tw

TODO
----
- Multiple stocks at once
- Customize mail theme
- Using more generic api to get price
- ...


License
-------
MIT
