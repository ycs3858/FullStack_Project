import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Edit() {

  // 제목 저장 state
  const [title, setTitle] = useState("");

  // 내용 저장 state
  const [content, setContent] = useState("");

  // 페이지 이동 기능
  const navigate = useNavigate();

  // URL에서 id 가져오기
  // 예: /edit/3 → id = 3
  const { id } = useParams();

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
    await fetch (`http://localhost:3000/post/update/${id}`,
        {
            method : 'PUT',
            headers : {
                'Content-Type' : 'application/json'
            },
            // 실제 수정 데이터 전송
            body : JSON.stringify({
                title,
                content
            }), 
        });

        alert('수정 완료');

        navigate(`/post/${id}`);
  };

  return (
    <div>

      <h1>게시글 수정</h1>

      {/* 제목 입력창 */}
      <input
        value={title} // 현재 제목 state 표시
        onChange={(e) => setTitle(e.target.value)}
        // 입력 시 title 값 변경
      />

      <br />

      {/* 내용 입력창 */}
      <textarea
        value={content} // 현재 내용 state 표시
        onChange={(e) => setContent(e.target.value)}
        // 입력 시 content 값 변경
      />

      <br />

      {/* 나중에 수정 기능 연결 예정 */}
      <button onClick={handleUpdate}> 수정 완료 </button>

    </div>
  );
}

export default Edit;