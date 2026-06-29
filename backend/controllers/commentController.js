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