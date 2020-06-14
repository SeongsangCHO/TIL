const express = require('express');
const app = express();
const port = 3000;
var qs = require('querystring');
var bodyParser = require('body-parser');
var db = require('./config/db_conn');
var adminRouter = require('./routes/admin');

app.set('view engine', 'ejs');

app.use('/admin', adminRouter);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

// main page list print
app.get('/', function (req, res) {
    db.query('SELECT * FROM program_table',
        function(err, results, fields){
           if(err)
               console.log(err);
           res.render('main', {list : results});
        });
});



app.listen(port, function () {
    console.log(`listening ${port}`);
})