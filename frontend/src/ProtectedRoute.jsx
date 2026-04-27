// 페이지 이동을 위한 컴포넌트 import
import { Navigate } from "react-router-dom";

// children: 이 컴포넌트로 감싸진 실제 페이지 (예: Home)
function ProtectedRoute({ children }) {

  // localStorage에 저장된 로그인 여부 가져오기(로그아웃을 해야만 로그아웃)
  // sessionStorage에 저장된 로그인 여부 가져오기(브라우저 종료 시 로그아웃)
  // (로그인 성공 시 저장해둔 값)
  //const isLogin = localStorage.getItem("isLogin");
  // const isLogin = sessionStorage.getItem("isLogin");
  const token = localStorage.getItem("token");

  // 로그인 안 되어 있으면
  if (!token) {

    // 로그인 페이지("/")로 강제 이동
    return <Navigate to="/" />;
  }

  // 로그인 되어 있으면 원래 페이지(children) 보여줌
  return children;
}

export default ProtectedRoute;