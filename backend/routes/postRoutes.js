const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

// 글 작성
router.post('/create', postController.createPost);

module.exports = router;


// 글 목록
router.get('/list', postController.getPosts);

// 글 상세보기
router.get('/detail/:id', postController.detailPost);