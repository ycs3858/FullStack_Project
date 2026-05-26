// React Hook import
import { useEffect } from "react";

// 페이지 이동 관련 import
import { Navigate, useNavigate }
from "react-router-dom";

// children: 감싸진 실제 페이지
function ProtectedRoute({ children }) {

  // 페이지 이동 기능
  const navigate = useNavigate();

  // localStorage에 저장된 JWT 가져오기
  const token = localStorage.getItem("token");

  // 페이지 들어올 때 토큰 유효성 검사
  useEffect(() => {

    const checkToken = async () => {

      // 토큰 없으면 검사 안함
      if (!token){
        return;
      }

      // 백엔드에 현재 로그인 상태 확인 요청
      const res = await fetch(
        "http://localhost:3000/user/me",
        {
          headers: {
            Authorization: token,
          },
        }
      );

      // 토큰 만료 또는 위조
      if (
        res.status === 401 ||
        res.status === 403
      ) {

        // 토큰 삭제
        localStorage.removeItem("token");

        // 안내 메시지
        alert("로그인 만료");

        // 홈으로 이동
        navigate("/");
      }
    };

    checkToken();

  }, [navigate, token]);

  // 로그인 안 되어 있으면 홈으로 이동
  if (!token) {
    return <Navigate to="/" />;
  }

  // 로그인 되어 있으면 원래 페이지 보여줌
  return children;
}

export default ProtectedRoute;