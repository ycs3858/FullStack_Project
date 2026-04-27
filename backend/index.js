const express = require('express');
const cors = require('cors');

const app = express();

// .env 파일 읽기
require('dotenv').config();

// 라우터 가져오기
const userRoutes = require('./routes/userRoutes');

// CORS 허용 + JSON 처리
app.use(cors());
app.use(express.json());


// 기본 테스트 API
app.get('/', (req, res) => {
  res.send('서버 실행 성공!');
});


// 🔥 /user로 시작하는 요청을 userRoutes로 전달
app.use('/user', userRoutes);


// 서버 실행
app.listen(3000, () => {
  console.log('서버가 3000번 포트에서 실행 중');
});