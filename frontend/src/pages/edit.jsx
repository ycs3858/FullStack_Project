import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Edit() {

  // 제목 저장 state
  const [title, setTitle] = useState("");

  // 내용 저장 state
  const [content, setContent] = useState("");

  // 프로필 드롭메뉴 사용
  const [showMenu, setshowMenu] = useState(false);

  // 페이지 이동 기능
  const navigate = useNavigate();

  // URL에서 id 가져오기
  // 예: /edit/3 → id = 3
  const { id } = useParams();

  // 토큰 정보 가져오기
  const token = localStorage.getItem('token');

  // 기존 게시글 불러오는 함수
  const fetchPost = async () => {

    // 백엔드에 게시글 상세조회 요청
    const res = await fetch(`http://localhost:3000/post/detail/${id}`);

    // 응답 데이터를 JSON 형태로 변환
    const data = await res.json();

    // 기존 제목 저장
    setTitle(data.title);

    // 기존 내용 저장
    setContent(data.content);
  };

  // 페이지 들어올 때 fetchPost 실행
  // [id] : id가 바뀌면 다시 실행
  useEffect(() => {
    fetchPost();
  }, [id]);

  // 게시글 수정 요청 함수
  const handleUpdate = async () => {
    const res = await fetch (`http://localhost:3000/post/update/${id}`,
        {
            method : 'PUT',
            headers : {
                'Content-Type' : 'application/json', Authorization : token
            },
            // 실제 수정 데이터 전송
            body : JSON.stringify({
                title,
                content
            }), 
        });

        const data = await res.json();

        alert(data.message);

        if (res.ok) {
          navigate(`/post/${id}`);
        }
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
                            게시글 수정
                        </h3>
                    </div>

                    <div className = "p-6">

                        <input
                            className = "w-full border rounded p-3 mb-4"
                            value ={title}
                            maxLength={50}
                            onChange={(e) => setTitle(e.target.value)}
                        />

                        <textarea
                            className = "w-full border rounded p-3 min-h-[400px] resize-none"
                            value ={content}
                            onChange={(e) => setContent(e.target.value)}
                        />

                    </div>
                </div>

                <div className = "flex justify-between mt-6">

                    <button
                        className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                        onClick={() => navigate(`/post/${id}`)}
                    >
                        취소
                    </button>

                    <button
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        onClick={handleUpdate}
                    >
                        수정
                    </button>

                </div>

            </section>


        </main>

    </div>
  );
}

export default Edit;