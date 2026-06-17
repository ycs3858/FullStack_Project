import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Home() {

  const navigate = useNavigate();

    // 🔥 페이지 들어올 때 토큰 검사 (자동 로그아웃)
  useEffect(() => {

    const checkToken = async () => {
      const token = localStorage.getItem("token");
      if (!token){
        navigate("/");
        return;
      }

      const res = await fetch("https://fullstack-project-6982.onrender.com/user/me", {
        headers: {
          Authorization: token,
        },
      });

      // 🔥 토큰 만료 시
      if (res.status === 403 || res.status === 401) {
        alert("로그인 만료");
        localStorage.removeItem("token");
        navigate("/");
      }
    };

    checkToken();
  }, [navigate]);

  // 🔥 로그아웃
  const handleLogout = () => {
      // sessionStorge 제거
      // localStorge 제거
      // sessionStorage.removeItem("isLogin");
      // localStorage.removeItem("isLogin");
      localStorage.removeItem("token");
      navigate("/");
  };

  // 🔥 로그인 확인 (테스트용)
  const checkLogin = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch("https://fullstack-project-6982.onrender.com/user/me", {
      method: "GET",
      headers: {
      Authorization: token, // 🔥 핵심
    },
  });

  const data = await res.json();
  console.log(data);
};

  useEffect(() => {
    document.title = "Home";
  }, []);


  return (
    <div>
      <h1>홈 화면입니다</h1>
      <p>로그인 성공 후 이동한 페이지입니다.</p>

      {/*로그아웃 버튼*/}
      <button onClick={handleLogout}>로그아웃</button>

      <br/>

      {/* 로그인 확인버튼 */}
      <button onClick={checkLogin}>로그인 확인</button>

      <br/>

      {/* 게시판 이동 버튼 */}
      <button onClick={() => navigate("/board")}> 게시판 </button>
    
    </div>
  );
}

export default Home;