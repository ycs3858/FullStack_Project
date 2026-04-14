import { useState } from "react";

function App() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async() => {
    if (!id || !password){
      console.log("아이디와 패스워드를 입력하세요.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body : JSON.stringify({
          userid : id,
          password : password,
        }),
      });

      const data = await res.json();

      console.log("서버응답:", data.message);
    }
    catch (err){
      console.error("에러 발생:", err);
    }
  };

  return (
    <div>
      <h1>로그인</h1>

      <div>
        <input
          type="text"
          placeholder="아이디"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
      </div>

      <div>
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button onClick={handleLogin}>로그인</button>

      <p>아이디 : {id}</p>
      <p>비밀번호 : {password}</p>
    </div>
  );
}

export default App;