const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
var qs = require('querystring');
var bodyParser = require('body-parser');
var db = require('./config/db_conn');
var adminRouter = require('./routes/admin');

app.set('view engine', 'ejs');


// app.use(express.static('public'));
app.use(ignoreFavicon);

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

function ignoreFavicon(req, res, next) {
    if (req.originalUrl === '/favicon.ico') {
      res.status(204).json({nope: true});
    } else {
      next();
    }
  }



app.listen(port, function () {
    console.log(`listening ${port}`);
})