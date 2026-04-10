const express = require('express');
const app = express();
const mysql = require('mysql2');
const bcrypt = require('bcrypt'); // 암호화 라이브러리 추가

// JSON 요청 처리
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


// 회원가입 (암호화)
app.post('/signup', async (req, res) => {
  const { username, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = 'INSERT INTO users (username, password) VALUES (?, ?)';

    // hashedPassword 사용!!!
    db.query(sql, [username, hashedPassword], (err, result) => {
      if (err) {
        console.error(err);
        return res.send('회원가입 실패');
      }
      return res.send('회원가입 성공');
    });
  }
  catch (err) {
    console.error(err);
    return res.send('에러 발생');
  }
});


// 로그인 (암호화)
app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // promise 방식 사용
        const [results] = await db.promise().query(
            'SELECT * FROM users WHERE username=?',
            [username]
        );

        if (results.length === 0) return res.send('아이디 없음');

        const user = results[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) return res.send('비밀번호 다름');

        return res.send('로그인 성공');
    } catch (err) {
        console.error(err);
        return res.send('로그인 실패');
    }
});



// 서버 실행
app.listen(3000, () => {
  console.log('서버가 3000번 포트에서 실행 중');
});