// mysql2 라이브러리 불러오기
const mysql = require('mysql2');

// DB 연결 설정
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '3858',
  database: 'testdb'
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