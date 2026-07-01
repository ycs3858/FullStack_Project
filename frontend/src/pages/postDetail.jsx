import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function PostDetail() {

  const [post, setPost] = useState(null);

  const [comments, setComments] = useState([]);

  const [comment, setComment] = useState("");

  const navigate = useNavigate();

  // 프로필 드롭메뉴 사용
  const [showMenu, setshowMenu] = useState(false);

  const { id } = useParams();

  // 토큰 정보 가져오기
  const token = localStorage.getItem('token');

  const user = JSON.parse(atob(token.split('.')[1]));

  // 페이지 들어올 때 게시글 가져오기
  useEffect(() => {
    fetchPosts();
    fetchComments();
  }, [id]);

  const fetchPosts = async () => {
    const res = await fetch(`https://fullstack-project-6982.onrender.com/post/detail/${id}`);
    const data = await res.json();

    console.log(data);

    setPost(data);
  };

  // 게시글 삭제
  const handleDelete = async () => {
    await fetch(`https://fullstack-project-6982.onrender.com/post/delete/${id}`, 
      {method: "DELETE",
        headers : {Authorization : token}
      });

    navigate ('/board')
  };

  // 댓글 조회
  const fetchComments = async () => {
    const res = await fetch(
      `https://fullstack-project-6982.onrender.com/comment/${id}`
    );

    const data = await res.json();

    console.log(data);

    setComments(data);
  };

  // 댓글 작성
  const handleComment = async () => {

    if (comment.trim() === "") {
      alert("댓글을 입력해주세요.");
      return;
    }

    await fetch(
      "https://fullstack-project-6982.onrender.com/comment",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          post_id: id,
          userid: user.userid,
          content:comment
        })
      }
    );

    setComment("");

    fetchComments();
  };

  // 댓글 삭제
  const handleDeleteComment = async (commentId) => {

    const res = await fetch(`https://fullstack-project-6982.onrender.com/comment/${commentId}`,
      {
        method:"DELETE",
        headers : {Authorization : token}
      }
    );

    const data = await res.json();
    alert(data.message);
    fetchComments();
  };

  return (
    <div className = "min-h-screen bg-gray-100 flex flex-col">

        {/* 헤더 */}
        <header className="bg-white border-b px-6 py-4 flex justify-between items-center">
            <div 
              className = "text-2xl font-bold cursor-pointer bg-blue-100"
              onClick={() => navigate("/home")}
            >
              LOGO
            </div>

            <div className = "relative">
              <button onClick={() => setshowMenu(!showMenu)}>
                👤
              </button>

              {showMenu && (
                <div className = "absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg">
                  <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded-lg">
                    내 정보
                  </button>

                  <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded-lg">
                    내 게시물
                  </button>

                  <button
                    className = "block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500 rounded-lg"
                    onClick={() => {
                      localStorage.removeItem("token");
                      navigate("/")
                    }}  
                  >
                    로그아웃
                  </button>
                </div>
              )}
            </div>
        </header>

        {/* 메뉴바 */}
        <nav className = "bg-white border-b">
          <div className = "grid grid-cols-4 text-center px-6 py-3">
            <button 
              className = "py-3 hover:bg-gray-100"
            >
              홈
            </button>

            <button
              className = "py-3 hover:bg-gray-100"
              onClick={() => navigate("/board")}
            >
              게시판
            </button>

            <button className = "py-3 hover:bg-gray-100"> 공지사항 </button>

            <button className = "py-3 hover:bg-gray-100"> 자유게시판 </button>
          </div>
        </nav>

        {/* 본문 */}
        <main className = "flex flex-1">
          {/* 사이드바 */}
          <aside className = "w-52 bg-white border-r p-4">
            <div
              className = "py-5 hover:bg-gray-100"
              onClick={() => navigate("/board")}
            >
              게시판
            </div>
            <div className = "py-5 hover:bg-gray-100"> 공지사항 </div>
            <div className = "py-5 hover:bg-gray-100"> 자유게시판 </div>
          </aside>

          {/* 게시글 */}
          <section className = "flex-1 p-6">
            {post && (
              <div className = "bg-white rounded-lg shadow">

                {/* 제목 */}
                <div className = "p-6 border-b">
                  <h3 className = "text-2xl font-bold break-all">
                    {post.title}
                  </h3>
                </div>

                {/* 날짜 및 작성자 */}
                <div className ="flex justify-between p-4 border-b text-gray-600">
                  <div>
                    작성자 : {post.userid}
                  </div>

                  <div>
                    작성일자 : {post.created_at.slice(0,10)} <br/>
                    {/* 작성일자 : {new Date(post.created_at).toLocaleString()} */}
                  </div>                
                </div>

                {/* 게시글 내용 */}
                <div className = "p-6 min-h-[300px] whitespace-pre-wrap break-all">
                  {post.content}
                </div>

              </div>
            )}

            {/* 댓글 */}
            <div className="bg-white rounded-lg shadow mt-6 p-6">

              <h2 className="text-xl font-bold mb-4">
                댓글
              </h2>

              {comments.length === 0 ? (
                <div className="text-gray-500">
                  작성된 댓글이 없습니다.
                </div>
              ) : (comments.map((comment) => (
                <div key={comment.id} className = "border-b py-3">

                  <div className = "font-bold">
                    {comment.userid}

                    <div>
                      {(user.userid === comment.userid || user.role === 'admin')
                      &&
                      <button className = "px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                        onClick={() => handleDeleteComment(comment.id)}
                      >
                        삭제
                      </button>
                      }
                    </div>
                  </div>

                  <div className = "mt-1 whitespace-pre-wrap">
                    {comment.content}
                  </div>

                  <div className="text-sm text-gray-500 mt-1">
                    {comment.created_at.slice(0, 10)}
                  </div>

                </div>
              )))}

              <div className="mt-6">

                <textarea className="w-full border rounded p-2" rows="3"
                  placeholder="댓글을 입력하세요."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}/>

                <div className ="flex justify-end mt-2">
                  <button className ="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleComment}>
                    댓글 작성
                  </button>
                </div>
              </div>
            </div>

            {/* detail button */}
            <div className = "flex justify-between mt-6">
              <button
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              onClick={() => navigate("/board")}
              >
                목록
              </button>

              {post && (
                <div className = "flex gap-2">
                  {
                    (user.userid === post.userid)
                    &&
                    <button
                      className = "px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                      onClick={() => navigate(`/edit/${id}`)}
                    >
                      수정
                    </button>
                  }

                  {
                    (user.userid === post.userid || user.role === 'admin')
                    &&
                    <button
                      className = "px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                      onClick={handleDelete}
                      >
                      삭제
                    </button>
                  }

                </div>
              )}
            </div>

          </section>
        </main>
    </div>
  );
}

export default PostDetail;