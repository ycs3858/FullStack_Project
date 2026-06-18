import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Board() {
  const [posts, setPosts] = useState([]);
  // 페이지네이션에 사용
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const totalPages = Math.ceil(total / 10);

  // 페이지 이동 네비게이션
  const navigate = useNavigate();

  // 프로필 드롭메뉴 사용
  const [showMenu, setshowMenu] = useState(false);

  // 페이지 들어올 때 글 목록 가져오기
  useEffect(() => {
    fetchPosts();
  }, [currentPage]);

  const fetchPosts = async () => {
    const res = await fetch(`https://fullstack-project-6982.onrender.com/post/list?page=${currentPage}`);
    const data = await res.json();

    console.log(data); // 확인용
    setPosts(data.posts);
    
    setTotal(data.total);
  };

    useEffect(() => {
    document.title = "게시판";
  }, []);

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

          {/* 게시글 리스트 */}
          <section className = "flex-1 p-6">
            <div className="bg-white rounded-lg shadow">

              <div> 전체 게시글 수 : {total} </div>
              <div> 전체 페이지 수 : {totalPages} </div>

              <div className = "grid grid-cols-[7fr_2fr_1fr] font-bold p-4 border-b">
                <div> 제목 </div>
                <div> 작성자 </div>
                <div> 작성일</div>
              </div>

              {posts.map((post) => (
                <div
                  key={post.id}
                  className = "grid grid-cols-[7fr_2fr_1fr] p-4 border-b hover:bg-gray-50"
                >

                  <div
                    className = "truncate cursor-pointer"
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
            
            {/* 페이지네이션 */}
            <div className ="flex justify-center gap-2 mt-6">
              <button
                className ="px-3 py-1 border rounded"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                {"<"}
              </button>

              <div className = "flex gap-2">
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key = {index}
                    className = {`px-3 py-1 border rounded ${
                    currentPage === index + 1 ? "bg-blue-500 text-white" : ""}`}
                    onClick={() => setCurrentPage(index+1)}>
                      {index+1}
                  </button>
                ))}
              </div>

              <button
                className = "px-3 py-1 border rounded"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                {">"}
              </button>
            </div>

          </section>
          
          <div>
            <button
              className = "bg-blue-100"
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