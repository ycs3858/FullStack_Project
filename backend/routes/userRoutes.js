// express 라우터 생성
const express = require('express');
const router = express.Router();

// 컨트롤러 가져오기
const userController = require('../controllers/userController');

// 회원가입 API
// POST /user/signup
router.post('/signup', userController.signup);

// 로그인 API
// POST /user/login
router.post('/login', userController.login);

// 외부에서 사용 가능하도록 export
module.exports = router;