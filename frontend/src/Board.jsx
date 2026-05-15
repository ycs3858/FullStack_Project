import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Board() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  // 페이지 들어올 때 글 목록 가져오기
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const res = await fetch("http://localhost:3000/post/list");
    const data = await res.json();

    console.log(data); // 확인용
    setPosts(data);
  };

    useEffect(() => {
    document.title = "게시판";
  }, []);

  return (
    <div>
      <h1>게시판</h1>

      {/* 글쓰기 버튼 */}
      <button onClick={() => navigate("/write")}>
        글쓰기
      </button>

      <button onClick={() => navigate("/home")}> 홈으로 </button>

      <hr />

      {/* 글 목록 출력 */}
      {posts.map((post) => (
        <div key={post.id}>
          <h3 onClick = {() => navigate(`/post/${post.id}`)}>
            {post.title}
          </h3>
        </div>
      ))}
    </div>
  );
}

export default Board;