const db = require('../config/db');

// 댓글 조회
exports.getComments = (req, res) => {
  const postId = req.params.postId;

  const sql = `SELECT * FROM comments WHERE post_id = ? ORDER BY created_at ASC`;

  db.query(sql, [postId], (err, result) => {
    if (err) {
      console.error(err);

      return res.status(500).json({
        message: "댓글 조회 실패"
      });
    }

    res.json(result);
  });
};

// 댓글 작성
exports.createComment = (req, res) => {
  const { post_id, userid, content } = req.body;

  const sql = `INSERT INTO comments (post_id, userid, content) VALUES (?, ?, ?)`;

  db.query(
    sql,
    [post_id, userid, content],
    (err, result) => {

      if (err) {
        console.error(err);

        return res.status(500).json({
          message: "댓글 작성 실패"
        });
      }

      res.json({
        message: "댓글 작성 성공"
      });
    }
  );
};

// 댓글 삭제
exports.deleteComment = (req, res) =>{
  
  const commentId = req.params.id;
  const loginUser = req.user.userid;
  const loginRole = req.user.role;

  // 작성자 확인 DB
  const commentCheckSql = `SELECT userid from comments WHERE id = ?`;

  db.query(commentCheckSql, [commentId], (err, results) => {

    // DB 에러 발생 시
    if(err){
      console.error(err);
      return res.send('에러 발생');
    }

    // 댓글이 없는 경우
    if (results.length == 0){
      return res.send('댓글 없음')
    }

    // 댓글 작성자 조회
    const commentUser = results[0].userid;

    // 권한 검사
    if(loginUser !== commentUser && loginRole !== 'admin'){
      return res.status(403).json({
        message : '삭제 권한 없음'
      });
    }

    // 삭제 DB 실행
    const commentDeleteSql = 'DELETE FROM comments WHERE id = ?';

    // DB 실행
    db.query(commentDeleteSql, [commentId], (err, result) => {
      if (err){
        console.error(err);
        return res.send('삭제 실패');
      }

      return res.json({
        message : "삭제 완료"
      });

    })
  })
};

// 댓글 수정
exports.updateComment = (req, res) => {
  
  const commentId = req.params.id;
  const loginUser = req.user.userid;

  const {content} = req.body;

  // 댓글 내용 검사 함수
  if (!content || content.trim() === ""){
    return res.status(400).json({
      message : "댓글 내용을 작성하세요."
    });
  }

  const checkSql = 'SELECT userid FROM comments WHERE id = ?'

  // db 실행
  db.query(checkSql, [commentId], (err, results) => {

    if (err){
      console.error(err);
      return res.send('에러 발생');
    }

    // 댓글이 없는 경우
    if (results.length == 0){
      return res.send("댓글 없음")
    }

    // 댓글 작성자 가져오기
    const commentUser = results[0].userid;

    // 권한 검사
    if (loginUser !== commentUser){
      return res.status(403).json({
        message : '수정 권한 없음'
      });
    }

    // 수정 sql
    const updateCommentSql = "UPDATE comments SET content=? WHERE id=?";

    // db 실행
    db.query(updateCommentSql, [content, commentId], (err, result) => {

      // 에러 발생
      if (err) {
        console.error(err);
        return res.send('수정 실패');
      }

      // 성공
      return res.json({
        message : '수정 성공'
      });
    });
  });
};