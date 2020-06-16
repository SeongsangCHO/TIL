const express = require('express');
const app = express();
const port = 3000;
//로컬에서 돌릴 땐 127.0.0.1로 변경
//const hostname = '10.178.0.2';
var qs = require('querystring');
var bodyParser = require('body-parser');
var db = require('./config/db_conn');
var adminRouter = require('./routes/admin');

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.use('/admin', adminRouter);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

// main page list print
app.get('/', function (req, res) {
    var sql = 'SELECT * FROM program_table';
    db.query(sql, function (err, results) {
        if (err)
            console.log(err);
        res.render('main', {program_list: results});
    });
});



app.listen(port, function () {
    console.log(`listening ${port}`);
})