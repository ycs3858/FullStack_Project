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
    <div className = "min-h-screen bg-gray-100">

        {/* 헤더 */}
        <header className="bg-white border-b px-6 py-4 flex justify-between items-center">
            <div 
              className = "text-2xl font-bold cursor-pointer bg-blue-100"
              onClick={() => navigate("/home")}
            >
              LOGO
            </div>

            <button>
              👤
            </button>
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
        <main className = "flex">
          {/* 사이드바 */}
          <aside className = "w-52 bg-white border-r p-4">
            <div className = "py-5 hover:bg-gray-100"> 게시판 </div>
            <div className = "py-5 hover:bg-gray-100"> 공지사항 </div>
            <div className = "py-5 hover:bg-gray-100"> 자유게시판 </div>
          </aside>

          {/* 게시글 */}
          <section className = "flex-1 p-6">
            <div className="bg-white rounded-lg shadow">

              <div className = "grid grid-cols-3 font-bold p-4 border-b">
                <div> 제목 </div>
                <div> 작성자 </div>
                <div> 작성일</div>
              </div>

              {posts.map((post) => (
                <div
                  key={post.id}
                  className = "grid grid-cols-3 p-4 border-b hover:bg-gray-50"
                >

                  <div
                    className = "cursor-pointer"
                    onClick={() => navigate(`/post/${post.id}`)}
                  >
                    {post.title}
                  </div>

                  <div> {post.userid} </div>

                  <div>
                    {post.created_at.slice(5,10)}
                  </div>

                </div>
              ))}
            </div>
            
            <button className = "text-left" 
              onClick={() => navigate("/write")}>글쓰기</button>
          </section>
          
          <div className = "bg-blue-100">
            <button 
              onClick={() => navigate("/write")}
            >
              글쓰기
            </button>
          </div>
        </main>

    </div>
  );
}

export default Board;