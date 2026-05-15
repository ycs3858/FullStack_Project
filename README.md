# FullStack Web Page Project

## 📌 프로젝트 소개

React + Node.js + MySQL 기반의 JWT 인증 게시판 프로젝트입니다.

프론트엔드와 백엔드를 분리하여 개발하였으며,
회원가입 / 로그인 / JWT 인증 / 게시글 작성 및 조회 기능을 구현하였습니다.

---

# 🛠 사용 기술

## Frontend
- React
- React Router DOM
- CSS

## Backend
- Node.js
- Express
- MySQL
- JWT (jsonwebtoken)
- dotenv

---

# ✨ 구현 기능

## 🔐 인증 기능
- 회원가입
- 로그인
- JWT 토큰 발급
- 로그인 상태 유지
- Protected Route 적용
- 토큰 만료 시 자동 로그아웃

---

## 📝 게시판 기능
- 게시글 작성
- 게시글 목록 조회
- 최신 글 순 정렬

---

# 📂 프로젝트 구조

```text
project/
├── frontend/
│   ├── src/
│   │   ├── Login.jsx
│   │   ├── Signup.jsx
│   │   ├── Home.jsx
│   │   ├── Board.jsx
│   │   ├── Write.jsx
│   │   ├── ProtectedRoute.jsx
│   │   └── App.jsx
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── config/
│   ├── index.js
│   └── .env
```

---

# ⚙ 실행 방법

## Frontend 실행

```bash
cd frontend
npm install
npm run dev
```

## Backend 실행

```bash
cd backend
npm install
node index.js
```

---

# 🗄 Database

## userinfo 테이블

```sql
CREATE TABLE userinfo (
  id INT AUTO_INCREMENT PRIMARY KEY,
  userid VARCHAR(50),
  password VARCHAR(255)
);
```

## posts 테이블

```sql
CREATE TABLE posts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(100),
  content TEXT,
  userid VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

# 🔒 환경 변수 (.env)

```env
JWT_SECRET=your_secret_key
```

---

# 🚀 추가 예정 기능

- 게시글 상세보기(진행중)
- 게시글 수정
- 게시글 삭제
- bcrypt 비밀번호 암호화
- 게시판 UI 개선
- 반응형 디자인

---

# 📖 프로젝트 목표

- React와 Node.js 기반 웹 개발 흐름 이해
- JWT 인증 방식 학습
- CRUD 게시판 구현
- 프론트/백엔드 연동 경험
- GitHub 포트폴리오 프로젝트 제작