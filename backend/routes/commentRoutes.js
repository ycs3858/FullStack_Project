const express = require('express');
const router = express.Router();

const commentController = require('../controllers/commentController');
const { verify } = require('jsonwebtoken');

const { verifyToken } = require('../middlewares/authMiddleware');

router.get('/:postId', commentController.getComments);

router.post('/', commentController.createComment);

module.exports = router;

router.delete("/:id", verifyToken, commentController.deleteComment);

// 글 수정하기
router.put('/:id', verifyToken, commentController.updateComment);