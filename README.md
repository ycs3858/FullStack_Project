FullStack Board Project
📌 프로젝트 소개

React + Node.js + Express + MySQL 기반의 JWT 인증 게시판 프로젝트입니다.

프론트엔드와 백엔드를 분리하여 개발하였으며, 회원가입 / 로그인 / JWT 인증 / 게시글 CRUD 기능을 구현하였습니다.

사용자 권한에 따라 게시글 수정 및 삭제를 제한하였고, JWT를 활용하여 인증 및 권한 검증을 구현하였습니다.

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

### 게시글 조회

* 게시글 목록 조회
* 최신 글 순 정렬
* 게시글 상세보기

### 게시글 작성

* 로그인 사용자만 작성 가능

### 게시글 수정

* 작성자만 수정 가능

### 게시글 삭제

* 작성자 또는 관리자(admin)만 삭제 가능

### 권한 검증

* JWT 기반 사용자 인증
* 작성자 검증
* 관리자 권한 검증

---

# 📂 프로젝트 구조

```text
project
├── frontend
│   ├── src
│   │   ├── pages
│   │   ├── components
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
├── backend
│   ├── controllers
│   ├── routes
│   ├── middleware
│   ├── config
│   ├── index.js
│   ├── package.json
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
npm start
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

DB_HOST=your_db_host
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_db_name
```

---

# 🚀 추가 예정 기능

- bcrypt 비밀번호 암호화
- 페이지 내 UI 개선
- 반응형 UI 개선
- 배포 환경 구축

---

# 📖 프로젝트 목표

- Node.js / Express 서버 개발 경험
- React와 Node.js 기반 웹 개발 흐름 이해
- React 기반 SPA 개발 경험
- JWT 인증 및 권한 관리 학습
- MySQL 데이터베이스 연동
- CRUD 게시판 구현
- 프론트/백엔드 연동 경험
- GitHub 포트폴리오 프로젝트 제작