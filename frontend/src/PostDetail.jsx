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

  const handleDelete = async () => {
    await fetch(`http://localhost:3000/post/delete/${id}`, {method: "DELETE",});

    navigate ('/board')
  };

  return (
    <div>
      <h1>게시판 상세보기</h1>

      {post && (
        <div>

          <h3>{post.title}</h3>

          <p>{post.content}</p>

          <small>작성자 : {post.userid}</small>

          <br />
          <small> {new Date(post.created_at).toLocaleString()} </small>

          <br />
          <button onClick={handleDelete}> 삭제 </button>
          <button onClick={() => navigate(`/edit/${id}`)}> 수정 </button>
          <button onClick={() => navigate('/board')}> 돌아가기 </button>

        </div>
      )}
    </div>
  );
}

export default PostDetail;