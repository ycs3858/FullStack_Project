const db = require('../config/db');
const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.JWT_SECRET;

// 글 작성
exports.createPost = (req, res) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: '토큰 없음' });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const userid = decoded.userid;

    const { title, content } = req.body;

    const sql = 'INSERT INTO posts (title, content, userid) VALUES (?, ?, ?)';

    db.query(sql, [title, content, userid], (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: '작성 실패' });
      }
      res.json({ message: '글 작성 성공' });
    });

  } catch (err) {
    return res.status(403).json({ message: '토큰 유효하지 않음' });
  }
};


// 글 목록 조회
exports.getPosts = (req, res) => {
  const sql = 'SELECT * FROM posts ORDER BY created_at DESC';

  db.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: '조회 실패' });
    }

    res.json(results);
  });
};