import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import AuthContext from "./context/AuthProvider";

const Login = () => {
  const { setAuth } = useContext(AuthContext);
  const idRef = useRef();
  const errRef = useRef();

  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    idRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [id, pw]);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      console.log(id, pw);
      setId("");
      setPw("");
      setSuccess(true);
    },
    [id, pw]
  );

  return (
    <>
      {success ? (
        <section>
          <h1>로그인 성공</h1>
          <br />
          <p>
            <a href="#">홈으로 가기</a>
          </p>
        </section>
      ) : (
        <section>
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h1>로그인</h1>
          <form onSubmit={handleSubmit}>
            {/* 아이디 */}
            <label htmlFor="username">아이디</label>
            <input
              type="text"
              id="username"
              ref={idRef}
              autoComplete="off"
              onChange={(e) => setId(e.target.value)}
              value={id}
              required
            />

            {/* 비밀번호 */}
            <label htmlFor="password">비밀번호</label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPw(e.target.value)}
              value={pw}
              required
            />

            {/* 로그인 버튼 */}
            <button>로그인</button>
          </form>

          <p>
            계정이 필요한가요?
            <br />
            <span className="line">
              {/*put router link here*/}
              <a href="#">회원가입</a>
            </span>
          </p>
        </section>
      )}
    </>
  );
};

export default Login;
