const express = require('express');
const app = express();
const port = 3000;
var fs = require('fs');
var template = require('./views/index');
var db = require('./mysql');


// <!-- HTML문법을 사용하는 JS 템플릿 -->
app.set('view engine', 'ejs');


app.get('/ejs', function(req, res){
    res.render('test', {title : 'HELLO EJS'});
});


// <!-- JS에서 다른 JS의 HTML코드를 반환받아 출력하기 -->
app.get('/',function(req, res){
    var title = "Node JS로 JS를 받기";
    db.query('SELECT * FROM my_table', function(err, results, fields) {
        if (err) {
            console.log(err);
        }
        var html = template.HTML(title, results);
        console.log(results[1].db_id);
        res.send(html);
    });
});


// <!-- JS에서 HTML을 로드하기 --> 
// app.get('/html', (req, res) => {
//     fs.readFile('./views/main.html',function(err, html){
//         if(err)
//             throw err;
//         else
//         {
//             res.writeHeader(200, {"Content-Type": "text/html"});
//             res.end(html);
//         }
//     });
// });



app.listen(port, () => {
    console.log(`Server is running at ${port}`);
});