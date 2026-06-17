// 라우팅 관련 기능 import
import { Routes, Route } from "react-router-dom";

// 각 페이지 컴포넌트 import
// import Login from "./Login";
import Login from "./pages/login";
//import Signup from "./Signup";
import Signup from "./pages/signup";

import Home from "./Home";

import Board from "./pages/board";
import Write from "./pages/write";
import PostDetail from "./pages/postDetail";
import Edit from "./pages/edit";


// 보호된 페이지를 위한 컴포넌트 import
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    // Routes: 여러 페이지 경로를 관리
    <Routes>

      {/* "/" 경로로 들어오면 Login 페이지 보여줌 */}
      {/* "/" 경로 → 로그인 페이지 */}
      <Route path="/" element={<Login />} />

      {/* "/home" 경로 → 보호된 페이지 */}
      <Route
        path="/home"
        element={
          // 🔥 ProtectedRoute로 감싸서 접근 제어
          <ProtectedRoute>
            <Home /> {/* 실제 보여줄 페이지 */}
          </ProtectedRoute>
        }
      />

      {/* "/signup" 경로 → 회원가입 페이지 */}
      <Route path="/signup" element={<Signup />} />

      {/* "/login" 경로 → 로그인 페이지 */}
      <Route path="/login" element={<Login />} />

      {/* 게시판 / 글목록 */}
      <Route path = "/board" element = {
        <ProtectedRoute>
          <Board />
        </ProtectedRoute>
      } />

      {/* 게시판 / 글쓰기 */}
      <Route path = "/write" element = {
        <ProtectedRoute>
          <Write />
        </ProtectedRoute>
      } />

      {/* 게시판 / 글 상세보기 */}
      <Route path="/post/:id" element={
        <ProtectedRoute>
          <PostDetail />
        </ProtectedRoute>
      } />

      {/* 게시판 / 글 수정 */}
      <Route path="/edit/:id" element={
        <ProtectedRoute>
          <Edit />
        </ProtectedRoute>
      } />

    </Routes>
  );
}

export default App;