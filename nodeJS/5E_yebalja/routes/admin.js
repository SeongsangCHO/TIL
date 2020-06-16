const express = require('express');
const router = express.Router();
var qs = require('querystring');
var url = require('url');
var bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true}));

var db = require('../config/db_conn');
// admin page input date

router.get('/register', function (req, res) {
    res.render('admin');
});



// data insert from admin page
router.post('/register', function (req, res) {
    var reqBody = req.body;
    var insertData = [
        reqBody.program_title, reqBody.program_ageTarget,
        reqBody.program_Benefits, reqBody.program_languages,
        reqBody.program_content
    ];
    var sql = 'INSERT INTO program_table (program_title, program_ageTarget, program_Benefits, program_languages,' +
        ' program_content) VALUES (?,?,?,?,?)';
    db.query(sql, insertData, function (err, results) {
        if(err)
            console.log(err);
        console.log("input id is... " + results.insertId);
    });
    res.redirect('/admin/list');
    //res.render('admin');
});

router.get('/list', function (req, res) {
    var sql = 'SELECT * FROM program_table';
    db.query(sql, function (err, results) {
        if(err)
            console.log(err);

        res.render('list', {program_list : results});
    })
});

// get으로 qs받아오기, http://blog.naver.com/agapeuni/221064805723
router.get('/delete', function (req, res) {
    var deleteId = url.parse(req.url, true).query.id;
    var sql = 'delete from program_table where program_id = ?';
    db.query(sql, deleteId, function (err, result) {
        if(err)
            console.log(err);
        res.redirect('/admin/list');
    })
});

router.get('/update', function (req, res) {
    var updateId = url.parse(req.url, true).query.id;
   res.render('updatePost',{updateId : updateId});
})

router.post('/update', function (req,res) {
    var reqBody = req.body;
    var updateData = [
        reqBody.program_title, reqBody.program_ageTarget,
        reqBody.program_Benefits, reqBody.program_languages,
        reqBody.program_content, reqBody.program_id];
    var sql = 'UPDATE program_table ' +
                'SET program_title = ?,' +
                'program_ageTarget = ?,' +
                'program_Benefits = ?,' +
                'program_languages = ?,' +
                'program_content =?' +
                'where program_id = ?';
    db.query(sql, updateData, function (err, results) {
        if(err)
            console.log(err);
        console.log(results);
    });
    res.redirect('/admin/list');
})
module.exports = router;