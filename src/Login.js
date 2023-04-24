import React, { useEffect, useRef, useState } from "react";

const Login = () => {
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

  return (
    <section>
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <h1>로그인</h1>
      <form>
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
      </form>
    </section>
  );
};

export default Login;
