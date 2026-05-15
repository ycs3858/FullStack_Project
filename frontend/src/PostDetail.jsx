import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function PostDetail() {

  const [post, setPost] = useState(null);

  const navigate = useNavigate();
  const { id } = useParams();

  // 페이지 들어올 때 게시글 가져오기
  useEffect(() => {
    fetchPosts();
  }, [id]);

  const fetchPosts = async () => {
    const res = await fetch(`http://localhost:3000/post/detail/${id}`);
    const data = await res.json();

    console.log(data);

    setPost(data);
  };

  return (
    <div>
      <h1>게시판 상세보기</h1>

      {post && (
        <div>

          <h3>{post.title}</h3>

          <p>{post.content}</p>

          <small>{post.userid}</small>

          <br />

          <small>{post.created_at}</small>

        </div>
      )}
    </div>
  );
}

export default PostDetail;