const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const { verify } = require('jsonwebtoken');
const { verifyToken } = require('../middlewares/authMiddleware');

module.exports = router;

// 글 목록
router.get('/list', postController.getPosts);

// 글 작성
router.post('/create', postController.createPost);

// 글 상세보기
router.get('/detail/:id', postController.detailPost);

// 글 수정하기
router.put('/update/:id', verifyToken, postController.updatePost);

// 글 삭제하기
router.delete('/delete/:id', postController.deletePost);