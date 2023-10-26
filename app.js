// node_modules 에 있는 express 관련 파일을 가져온다.
var express = require('express')
const webpush = require('web-push');

// express 는 함수이므로, 반환값을 변수에 저장한다.
var app = express()

// 3000 포트로 서버 오픈
app.listen(3000, function() {
    console.log("start! express server on port 3000")
})

// 이제 터미널에 node app.js 를 입력해보자.

app.get('/', function(req, res) {
    res.sendFile(__dirname + "/public/main.html")
})

app.get('/send', function(req, res){
    webpush.setVapidDetails(
        "mailto:wldn9875@naver.com",
        "BKey8i5zEzeRcUy4KjC7OlnMMhcJiZGHW_tPDv4GvHOJ-FXU33dGhrVoWm8Soj2dVkTagK3zozfKkqTBiFj_odk",
        "p2omYRpLT4BMeOiHUMcOCJqTS_bQSWbRlu7JpyJ-p68"
    );

    webpush.sendNotification(
        {
            endpoint: "https://fcm.googleapis.com/fcm/send/fxPvRoc2KIk:APA91bH6w61UbamQAX7ZjT8hDSq4TQJOZe3OJyRZF1bJn2v-y3pWyEdK_VhCDjZxXs4gXvUouL5uv_pVPFaDIGnwyatdzYqaA451mHl-WMTBNcabpFOX36GJBQgAwnExztx547Mk2ofZ",
            keys: {
                p256dh: "BJEgnybl/3NBFvc5o8zY4SLZgIeAIiU6IzzCcpOINy9kMZcNgwqt2qzch/m+RQQo5jHdgnlE4DdFWN0JVeODWSY=",
                auth: "TfpzYTPyVDIaPw5EtinosQ=="
            }
        },
        "hello"
    )    
})

app.use(express.static('public'))