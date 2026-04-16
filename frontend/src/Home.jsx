function Home() {

    const handleLogout = () => {
        // sessionStorge 제거
        // localStorge 제거
        // sessionStorage.removeItem("isLogin");
        localStorage.removeItem("isLogin");

        window.location.href ="/";
    };


  return (
    <div>
      <h1>홈 화면입니다</h1>
      <p>로그인 성공 후 이동한 페이지입니다.</p>

      {/*로그아웃 버튼*/}
      <button onClick={handleLogout}>로그아웃</button>
    </div>
  );
}

export default Home;