// 상태 관리 (입력값, 메시지 등)
import { useState } from "react";

// 페이지 이동을 위한 훅
import { useNavigate } from "react-router-dom";

// css 파일 적용
import "./Login.css";

import { useEffect } from "react";

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
      if (data.message === "로그인 성공") {
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
      <div className="main_container">

        <div className = "main_content">

          <div className ="Logo_img">
            <h1>로그인</h1>
          </div>

          <div className = 'input_login'>

            <div className = 'input_id'>
            {/* 아이디 입력창 */}
              <input
                type="text"
                placeholder="아이디를 입력하세요."
                value={id}
                onChange={(e) => setId(e.target.value)} // 입력 시 상태 업데이트
              />
            </div>

            <div className="input_pw">
              {/* 비밀번호 입력창 */}
              <input
                type="password"
                placeholder="비밀번호를 입력하세요."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            
          </div>

          {/* 로그인 결과 메시지 출력 */}
          <p
            style={{
              color: message.includes("성공") ? "green" : "red",
            }}
          >
            {message}
          </p>

          <div className = 'button_list'>
            {/* 로그인 버튼 */}
            <button onClick = {handleLogin}> 로그인 </button>

            {/* 회원가입 버튼 */}
            <button onClick = {() => navigate("/signup")}> 회원가입 </button>
          </div>

        </div>

      </div>
  );
}

export default Login;