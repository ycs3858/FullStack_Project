// 라우팅 관련 기능 import
import { Routes, Route } from "react-router-dom";

// 각 페이지 컴포넌트 import
import Login from "./Login";
import Home from "./Home";
import Signup from "./Signup";

import Board from "./Board";
import Write from "./Write";



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

      <Route path = "/board" element = {<Board />} />

      <Route path = "/write" element = {<Write />} />

    </Routes>
  );
}

export default App;