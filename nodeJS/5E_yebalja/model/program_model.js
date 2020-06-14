var db = require('../config/db_conn');

db.query(sql, insertData, function (err, results) {
    if(err)
        console.log(err);
    console.log("input id is... " + results.insertId);
});
