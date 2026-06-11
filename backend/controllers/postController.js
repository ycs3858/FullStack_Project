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
  const page = Number(req.query.page) || 1;

  const limit = 10;

  const offset = (page - 1) * limit;
  
  // 로그 확인
  console.log("page=", page);
  console.log("offset=", offset);

  // 게시글 확인
  const postSql = 'SELECT * FROM posts ORDER BY created_at DESC LIMIT ? OFFSET ?';

  // 게시글 수량 확인 / 페이지네이션
  const countSql = "SELECT COUNT(*) AS total FROM posts";

  db.query(postSql, [limit, offset], (err, posts) => {
    // 로그 확인
    console.log("조회 개수 = ", posts.length);
    if (err) {
      console.error(err);
      return res.status(500).json({ message: '조회 실패' });
    }

    db.query(countSql, (err,countResult) => {
      if (err){
        console.error(err);
        return res.status(500).json({message : "조회 실패"});
      }
      res.json({posts, total:countResult[0].total});
    });
  });
};

// 게시글 상세조회
exports.detailPost = (req, res) => {

  // URL에서 id 가져오기
  const { id } = req.params;

  // 게시글 조회 쿼리
  const sql = 'SELECT * FROM posts WHERE id=?';

  db.query(sql, [id], (err, result) => {

    if (err) {
      console.error(err);
      return res.send('조회 실패');
    }

    // 게시글 없을 때
    if (result.length === 0) {
      return res.status(404).json({
        message : '게시글 없음'
      });
    }

    // 게시글 반환
    return res.json(result[0]);

  });
};

// 게시글 수정
exports.updatePost = (req, res) => {
  
  //URL에서 게시글 id 가져오기
  const {id} = req.params;

  // 프론트에서 보낸 title, content 가져오기
  const {title, content} = req.body;

  // 현재 로그인한 사용자 정보 확인
  const loginUser = req.user.userid;

  // 수정 권한 확인 sql
  const checkSql = 'Select userid FROM posts WHERE id=?';

  // db 실행
  db.query(checkSql, [id], (err, results) => {
    
    // DB 에러 발생 시
    if (err){
      console.error(err);
      return res.send('에러 발생');
    }

    // 게시글이 없는 경우
    if (results.length == 0){
      return res.send('게시글 없음');
    }

    // 게시글 작성자 가져오기
    // results[0] = 게시글 정보 객체
    // .userid = 작성자 아이디
    const postUser = results[0].userid;

    // 권한 검사
    if(loginUser !== postUser){
      return res.status(403).json({
        message : '수정 권한 없음'
      });
    }

    // 수정 sql 작성
    const sql = 'UPDATE posts SET title=?, content=? WHERE id=?';

    // db 실행
    db.query(sql, [title, content, id], (err, result) => {
    
      // 에러 발생
      if (err) {
        console.error(err);
        return res.send('수정 실패');
      }

      // 성공
      return res.json({
        message : '수정 완료'
      });
    
    });

  });

};

// 게시글 삭제
exports.deletePost = (req, res) => {

  // URL에서 id 가져오기
  const { id } = req.params;

  const loginUser = req.user.userid;
  const loginRole = req.user.role;

  // 삭제 권한 확인 sql
  const checkSql = 'Select userid FROM posts WHERE id=?';

  // DB 실행
  db.query(checkSql, [id], (err, results) => {

    // DB 에러 발생 시
    if (err){
      console.error(err);
      return res.send('에러 발생');
    }

    // 게시글이 없는 경우
    if (results.length == 0){
      return res.send('게시글 없음')
    }

    // 게시글 작성자 가져오기
    // results[0] = 게시글 정보 객체
    // .userid = 작성자 id
    const postUser = results[0].userid;

    // 권한 검사
    if(loginUser !== postUser && loginRole !== 'admin'){
      return res.status(403).json({
        message : '삭제 권한 없음'
      });
    }


    // 삭제 DB 실행
    // sql
    const sql = 'DELETE FROM posts WHERE id=?';

    db.query(sql, [id], (err, result) => {

      if (err) {
        console.error(err);
        return res.send('삭제 실패');
      }

      return res.json({
        message : '삭제 완료'
      });

    });

  });

};