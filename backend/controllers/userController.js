// JWT 라이브러리
const jwt = require('jsonwebtoken');

// .env에서 비밀키 가져오기
const SECRET_KEY = process.env.JWT_SECRET;

// DB 연결 가져오기
const db = require('../config/db');

// 회원가입
exports.signup = (req, res) => {
  const { userid, password } = req.body;

  // 아이디 중복 체크 쿼리
  const sql_check = 'SELECT * FROM userinfo WHERE userid=?';

  // 회원가입 쿼리
  const sql_insert = 'INSERT INTO userinfo (userid, password) VALUES (?, ?)';

  // 1️⃣ 아이디 존재 여부 확인
  db.query(sql_check, [userid], (err, result) => {
    if (err) {
      console.error(err);
      return res.send('에러발생');
    }

    // 이미 존재하는 아이디
    if (result.length > 0) {
      return res.send('이미 사용중인 아이디입니다.');
    }

    // 2️⃣ 회원가입 진행
    db.query(sql_insert, [userid, password], (err, result) => {
      if (err) {
        console.error(err);
        return res.send('회원가입 실패');
      } else {
        return res.send('회원가입 성공');
      }
    });
  });
};


// 로그인
exports.login = (req, res) => {
  const { userid, password } = req.body;

  // 아이디 + 비밀번호 확인 쿼리
  const sql = 'SELECT * FROM userinfo WHERE userid=? AND password=?';

  db.query(sql, [userid, password], (err, results) => {
    if (err) {
      return res.json({ message: '로그인 실패' });
    }

    // 로그인 성공
    if (results.length > 0) {
      const token = jwt.sign(
        { userid : userid}, // 토큰에 넣을 정보
        SECRET_KEY,         // 비밀키
        {expiresIn : '5m'}  // 5분간 유효, 1h, 1m, 1s
      );

      return res.json({ message : '로그인 성공', token : token});
    } 
    // 로그인 실패
    else {
      return res.json({ message: '아이디 또는 비밀번호 틀림' });
    }
  });
};