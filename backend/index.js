const express = require('express');
const app = express();
const mysql = require('mysql2');
const cors = require('cors');


// JSON 요청 처리
app.use(cors());
app.use(express.json());

// DB 연결
const db = mysql.createConnection({
  host : 'localhost',
  user : 'root',
  password : '3858', // workbench 설정한 비밀번호
  database : 'testdb'
});

db.connect((err) => {
  if (err){
    console.error('DB 연결 실패:', err);
  }
  else {
    console.log('DB 연결 성공!');
  }
});



// 기본 테스트 API
app.get('/', (req, res) => {
  res.send('서버 실행 성공!');
});


// 회원가입 <- 작성중
app.post('/signup', (req, res) => {
  const { userid, password } = req.body;

  const sql_check = 'SELECT * FROM userinfo WHERE userid=?';
  const sql_insert = 'INSERT INTO userinfo (userid, password) VALUES (?, ?)';

  // 아이디 존재 유무 확인
  db.query(sql_check, [userid], (err, result) => {
    if (err){
      console.error(err);
      return res.send('에러발생');
    }

    // 아이디가 있는경우
    if (result.length > 0) {
      return res.send('이미 사용중인 아이디입니다.');
    }

    // 아이디가 없는 경우
    db.query(sql_insert, [userid, password], (err, result) => {
      if (err) {
        console.error(err);
        res.send('회원가입 실패');
      }
      else {
        res.send('회원가입 성공');
      }
    });

  });

});


// 로그인
app.post('/login', (req, res) => {
  const { userid, password } = req.body;

  const sql = 'SELECT * FROM userinfo WHERE userid=? AND password=?';

  db.query(sql, [userid, password], (err, results) => {
    if (err) {
      res.json({message : '로그인 실패' });
    }
    else {
      if (results.length > 0) {
        res.json({message : '로그인 성공' });
      }
      else {
        res.json({message : '아이디 또는 비밀번호 틀림' });
      }
    }
  });
});



// 서버 실행
app.listen(3000, () => {
  console.log('서버가 3000번 포트에서 실행 중');
});