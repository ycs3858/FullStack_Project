import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Write() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const navigate = useNavigate();
  
  // 프로필 드롭메뉴 사용
  const [showMenu, setshowMenu] = useState(false);

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch("https://fullstack-project-6982.onrender.com/post/create", {
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

                <div className = "bg-white rounded-lg shadow">

                    <div className = "p-6 border-b">
                        <h3 className = "text-2xl font-bold">
                            게시글 작성
                        </h3>
                    </div>

                    <div className = "p-6">

                        <input
                            className = "w-full border rounded p-3 mb-4"
                            placeholder="제목을 입력하세요."
                            value ={title}
                            maxLength={50}
                            onChange={(e) => setTitle(e.target.value)}
                        />

                        <textarea
                            className = "w-full border rounded p-3 min-h-[400px] resize-none"
                            placeholder="내용을 입력하세요."
                            value ={content}
                            onChange={(e) => setContent(e.target.value)}
                        />

                    </div>
                </div>

                <div className = "flex justify-between mt-6">

                    <button
                        className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                        onClick={() => navigate("/board")}
                    >
                        취소
                    </button>

                    <button
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        onClick={handleSubmit}
                    >
                        작성
                    </button>

                </div>

            </section>


        </main>

    </div>
  );
}

export default Write;