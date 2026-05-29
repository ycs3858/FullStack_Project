// 상태 관리 (입력값, 메시지 등)
import { useState, useEffect } from "react";

// 페이지 이동을 위한 훅
import { useNavigate } from "react-router-dom";


function Login() {
  // 아이디 입력값 저장
  const [id, setId] = useState("");

  // 비밀번호 입력값 저장
  const [password, setPassword] = useState("");

  // 로그인 결과 메시지 (성공/실패)
  const [message, setMessage] = useState("");

  // 페이지 이동 함수
  const navigate = useNavigate();

  // 로그인 버튼 클릭 시 실행되는 함수
  const handleLogin = async () => {

    // 입력값 체크
    if (!id || !password) {
      setMessage("아이디와 비밀번호를 입력하세요.");
      return;
    }

    try {
      // 백엔드로 로그인 요청 보내기
      const res = await fetch("http://localhost:3000/user/login", {
        method: "POST", // POST 방식
        headers: {
          "Content-Type": "application/json", // JSON 형태로 보냄
        },
        body: JSON.stringify({
          userid: id,
          password: password,
        }),
      });


      // 서버 응답 JSON으로 변환
      const data = await res.json();


      // 로그인 결과 메시지 저장 (UI에 표시됨)
      setMessage(data.message);

      // 로그인 성공 시 홈 페이지로 이동
      if (data.token) {
        // 테스트 로그 등록


        // sessionStorage로 변경 (브라우저 닫으면 자동 삭제)
        // 로그아웃 해야만 삭제할 경우 localStorage로 변경
        // sessionStorage.setItem("isLogin", "true");
        // localStorage.setItem("isLogin", "true");

        // 토큰 저장
        localStorage.setItem("token", data.token);

        navigate("/home");
      }


    } catch (err) {
      console.error("에러 발생:", err);
      setMessage("서버 오류 발생");
    }
  };


  useEffect(() => {
    document.title = "로그인";
  }, []);

  return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">

        <div className = "w-full max-w-md bg-white rounded-xl shadow-lg p-8">

          <div className ="mb-8 text-center">
            <h1 className = "text-3xl font-bold">로그인</h1>
          </div>

          <div className = "space-y-4">

            {/* 아이디 입력창 */}
            <input
                type="text"
                placeholder="아이디를 입력하세요."
                value={id}
                onChange={(e) => setId(e.target.value)} // 입력 시 상태 업데이트
                className = "w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* 비밀번호 입력창 */}
            <input
                type="password"
                placeholder="비밀번호를 입력하세요."
                value={password}
                onChange={(e) => setPassword(e.target.value)}

                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleLogin();
                    }
                }}
                className = "w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            
          </div>

          {/* 로그인 결과 메시지 출력 */}
          {message && (
            <p
            className = {`mt-4 text-center font-medium ${
            message.includes("성공") ? "text-green-600" : "text-red-600"}`}>
                {message}
            </p>
          )}

          {/* 버튼 */}
          <div className = "flex gap-3 mt-6">

            {/* 로그인 버튼 */}
            <button 
                onClick = {handleLogin}
                className = "flex-1 bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition"
            > 
                로그인 
            </button>

            {/* 회원가입 버튼 */}
            <button
                onClick = {() => navigate("/signup")}
                className = "flex-1 bg-gray-200 py-3 rounded-lg hover:bg-gray-300 transition"
            >
                회원가입
            </button>

          </div>

        </div>

      </div>
  );
}

export default Login;