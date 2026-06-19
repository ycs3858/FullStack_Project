// mysql2 라이브러리 불러오기
const mysql = require('mysql2');

const fs = require('fs');


console.log("HOST:", process.env.DB_HOST);
console.log("PORT:", process.env.DB_PORT);
console.log("CA exists:", fs.existsSync('./cert/ca.pem'));


// DB 연결 설정
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port : process.env.DB_PORT,

  ssl: {
    ca: fs.readFileSync('./cert/ca.pem')
  }
});

// DB 연결 실행
db.connect((err) => {
  if (err) {
    console.error('DB 연결 실패:', err);
  } else {
    console.log('DB 연결 성공!');
  }
});

// 다른 파일에서 사용 가능하도록 export
module.exports = db;