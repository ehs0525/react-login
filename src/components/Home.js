import { useNavigate, Link } from "react-router-dom";
import { useCallback, useContext } from "react";
import AuthContext from "../context/AuthProvider";

const Home = () => {
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const logout = useCallback(async () => {
    // if used in more components, this should be in context
    // axios to /logout endpoint
    setAuth({});
    navigate("/linkpage");
  }, [setAuth, navigate]);

  return (
    <section>
      <h1>홈 화면</h1>
      <br />
      <p>로그인에 성공하셨습니다.</p>
      <br />
      <Link to="/editor">Editor 페이지로 가기</Link>
      <br />
      <Link to="/admin">Admin 페이지로 가기</Link>
      <br />
      <Link to="/lounge">Lounge로 가기</Link>
      <br />
      <Link to="/linkpage">link 페이지로 가기</Link>
      <div className="flexGrow">
        <button onClick={logout}>로그아웃</button>
      </div>
    </section>
  );
};

export default Home;
