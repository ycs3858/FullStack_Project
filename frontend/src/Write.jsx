import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Write() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const navigate = useNavigate();   

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:3000/post/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        title,
        content,
      }),
    });

    const data = await res.json();
    alert(data.message);

    navigate("/board");

  };

  return (
    <div>
      <h1>글 작성</h1>

      <input
        placeholder="제목"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <br />

      <textarea
        placeholder="내용"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <br />

      <button onClick={handleSubmit}>작성</button>

      <button onClick={() => navigate("/board")}>돌아가기</button>
    </div>
  );
}

export default Write;