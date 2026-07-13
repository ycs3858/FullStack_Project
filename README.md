# 📌 FullStack Board Project

React + Node.js + Express + MySQL 기반의 JWT 인증 게시판 프로젝트입니다.

프론트엔드와 백엔드를 분리하여 개발하였으며, 회원가입, 로그인, 게시글 및 댓글 CRUD 기능을 구현하였습니다.

JWT 인증을 이용하여 사용자 권한을 관리하였으며, 작성자 및 관리자 권한에 따라 게시글과 댓글의 수정 및 삭제를 제한하였습니다.

---

# 🚀 프로젝트 소개

본 프로젝트는 React와 Node.js를 활용하여 구현한 게시판 서비스입니다.

사용자는 회원가입 후 로그인하여 게시글과 댓글을 작성할 수 있으며, 작성자는 자신의 게시글과 댓글을 수정 및 삭제할 수 있습니다. 관리자는 모든 게시글과 댓글을 삭제할 수 있도록 권한을 분리하여 구현하였습니다.

또한 JWT 인증을 이용한 로그인 기능을 구현하였습니다.

---

# 🛠 사용 기술

## Frontend

* React
* React Router DOM
* JavaScript
* Fetch API
* CSS

## Backend

* Node.js
* Express
* MySQL
* JWT (jsonwebtoken)
* dotenv

## Deployment

* Frontend : Vercel
* URL : https://full-stack-project-three-sand.vercel.app
* Backend : Render
* Database : Aiven (MySQL)

---

# ✨ 구현 기능

## 🔐 인증 기능

* 회원가입
* 로그인
* JWT 토큰 발급
* 로그인 상태 유지
* Protected Route 적용
* JWT 기반 사용자 인증

---

## 📝 게시판 기능

### 게시글 조회

* 게시글 목록 조회
* 게시글 상세보기

### 게시글 작성

* 로그인 사용자만 작성 가능

### 게시글 수정

* 작성자만 수정 가능

### 게시글 삭제

* 작성자 또는 관리자(Admin) 삭제 가능

---

## 💬 댓글 기능

### 댓글 조회

* 게시글별 댓글 조회

### 댓글 작성

* 로그인 사용자만 작성 가능

### 댓글 수정

* 작성자만 수정 가능

### 댓글 삭제

* 작성자 또는 관리자(Admin) 삭제 가능

---

## 🔒 권한 관리

* JWT 기반 사용자 인증
* 게시글 작성자 권한 검증
* 댓글 작성자 권한 검증
* 관리자(Admin) 권한 검증

---

# 📂 프로젝트 구조

```
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

## Frontend

```bash
cd frontend
npm install
npm run dev
```

## Backend

```bash
cd backend
npm install
npm start
```

---

# 🗄 Database

## userinfo

```sql
CREATE TABLE userinfo (
  id INT AUTO_INCREMENT PRIMARY KEY,
  userid VARCHAR(50),
  password VARCHAR(255)
);
```

## posts

```sql
CREATE TABLE posts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(100),
  content TEXT,
  userid VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## comments

```sql
CREATE TABLE comments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  post_id INT,
  userid VARCHAR(50),
  content TEXT,
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

# 📚 프로젝트를 진행하며 배운 점

* React의 상태 관리(useState, useEffect)
* Fetch API를 이용한 프론트엔드와 백엔드 통신
* REST API 설계 및 CRUD 구현
* JWT 기반 인증 및 권한 관리
* bcrypt를 이용한 비밀번호 암호화
* MySQL 데이터베이스 연동
* 게시글 및 댓글 CRUD 구현
* React 조건부 렌더링을 활용한 댓글 수정 기능 구현
* Render와 Vercel을 이용한 프로젝트 배포

---

# 🚀 향후 개선 예정

* TypeScript 적용
* NestJS 또는 Spring Boot 버전으로 프로젝트 재구현
* 게시글 검색 기능
* 파일 업로드 기능

---

# 🎯 프로젝트 목표

* React 기반 SPA 개발 경험
* Node.js / Express 서버 개발 경험
* JWT 인증 및 권한 관리 구현
* MySQL 데이터베이스 연동
* 게시글 및 댓글 CRUD 구현
* 프론트엔드와 백엔드 연동 경험
* GitHub 포트폴리오 프로젝트 제작

---