//db 설정 파일
const mysql = require('mysql');
require('dotenv').config();

try {
  const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'PI_test'
  })
} catch (err) { 
  if (err) console.error(err);
}

connection.connect((err) => { 
  if (err) throw err;
})