// React에서 상태(state)를 사용하기 위한 훅
import { useEffect, useState } from "react";

// 페이지 이동을 위한 훅 (react-router)
import { useNavigate } from "react-router-dom";

function Signup() {
  // 🔥 아이디 입력값 저장
  const [id, setId] = useState("");

  // 🔥 비밀번호 입력값 저장
  const [password, setPassword] = useState("");

  // 🔥 서버 응답 메시지 (성공/실패)
  const [message, setMessage] = useState("");

  // 🔥 페이지 이동 함수
  const navigate = useNavigate();

  // 🔥 회원가입 버튼 클릭 시 실행되는 함수
  const handleSignup = async () => {

    // 1️⃣ 입력값이 비어있는지 확인
    if (!id || !password) {
      setMessage("아이디와 비밀번호를 입력하세요.");
      return; // 함수 종료
    }

    try {
      // 2️⃣ 백엔드 서버로 회원가입 요청 보내기
      const res = await fetch("https://fullstack-project-6982.onrender.com/user/signup", {
        method: "POST", // POST 요청
        headers: {
          "Content-Type": "application/json", // JSON 형식으로 전송
        },
        body: JSON.stringify({
          userid: id,        // 서버에 보낼 아이디
          password: password // 서버에 보낼 비밀번호
        }),
      });

      // 3️⃣ 서버 응답 받기
      // 현재 백엔드는 문자열을 보내고 있어서 text() 사용
      const data = await res.text();

      // 4️⃣ 응답 메시지를 화면에 출력
      setMessage(data);

      // 5️⃣ 회원가입 성공 시 로그인 페이지로 이동
      if (data.includes("성공")) {
        navigate("/"); // 로그인 페이지로 이동
      }

    } catch (err) {
      // 서버 오류 발생 시
      console.error(err);
      setMessage("서버 오류 발생");
    }
  };

  useEffect(() => {
    document.title = "회원가입";
  }, []);

  // 🔥 화면(UI)
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

        <div className = "w-full max-w-md bg-white rounded-xl shadow-lg p-8">

            <div className ="mb-8 text-center">
                <h1 className = "text-3xl font-bold">회원가입</h1>
            </div>

            <div className = "space-y-4">

              {/* 아디이 입력창 */}
              <input
                  type="text"
                  placeholder="아이디를 입력하세요"
                  value={id} // 상태값 연결
                  onChange={(e) => setId(e.target.value)} // 입력 시 상태 업데이트
                  className = "w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500y"
              />

              <input
                type = "password"
                placeholder="비밀번호를 입력하세요"
                value ={password}
                onChange={(e) => setPassword(e.target.value)}
                className = "w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* 메시지 출력 공간 */}
            {message && (
              <p
                className = {`mt-4 text-center font-medium text-red-600`}>
                  {message}
                </p>
            )}

            {/* 버튼 */}
            <div className = "flex gap-3 mt-6">
              {/* 회원 가입 버튼 */}
              <button
                onClick = {handleSignup}
                className = "flex-1 bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition"
              >
                회원 가입
              </button>

              <button
                onClick={() => navigate("/login")}
                className = "flex-1 bg-gray-200 py-3 rounded-lg hover:bg-gray-300 transition"
              >
                돌아가기
              </button>

            </div>
        </div>
    </div>
  );
}

// 다른 파일에서 사용할 수 있도록 export
export default Signup;