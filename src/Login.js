import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import AuthContext from "./context/AuthProvider";
import axios from "./api/axios";

const LOGIN_URL = "/auth";

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

      try {
        const response = await axios.post(
          LOGIN_URL,
          JSON.stringify({ user: id, pwd: pw }),
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
        console.log(JSON.stringify(response?.data));
        // console.log(JSON.stringify(response));
        const accessToken = response?.data?.accessToken;
        const roles = response?.data?.roles;
        setAuth({ id, pw, roles, accessToken });
        setId("");
        setPw("");
        setSuccess(true);
      } catch (err) {
        if (!err?.response) {
          setErrMsg("서버 응답 없음");
        } else if (err.response?.status === 400) {
          setErrMsg("아이디 또는 비밀번호를 입력하세요.");
        } else if (err.response?.status === 401) {
          setErrMsg("인증되지 않은 사용자입니다.");
        } else {
          setErrMsg("로그인에 실패하였습니다.");
        }
        errRef.current.focus();
      }
    },
    [id, pw, setAuth]
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
