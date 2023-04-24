import React, { useCallback, useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";

import axios from "../api/axios";

const ID_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PW_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = "/register";

const Register = () => {
  const idRef = useRef();
  const errRef = useRef();

  const [id, setId] = useState("");
  const [isIdValid, setIsIdValid] = useState(false);
  const [isIdFocused, setIsIdFocused] = useState(false);

  const [pw1, setPw1] = useState("");
  const [isPw1Valid, setIsPw1Valid] = useState(false);
  const [isPw1Focused, setIsPw1Focused] = useState(false);

  const [pw2, setPw2] = useState("");
  const [isPw2Valid, setIsPw2Valid] = useState(false);
  const [isPw2Focused, setIsPw2Focused] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    idRef.current.focus();
  }, []);

  useEffect(() => {
    const result = ID_REGEX.test(id);
    console.log(result);
    console.log(id);
    setIsIdValid(result);
  }, [id]);

  useEffect(() => {
    const result = PW_REGEX.test(pw1);
    console.log(result);
    console.log(pw1);
    setIsPw1Valid(result);
    setIsPw2Valid(pw1 === pw2);
  }, [pw1, pw2]);

  useEffect(() => {
    setErrMsg("");
  }, [id, pw1, pw2]);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      // if button enabled with JS hack
      const v1 = ID_REGEX.test(id);
      const v2 = PW_REGEX.test(pw1);
      if (!v1 || !v2) {
        setErrMsg("잘못된 접근입니다.");
        return;
      }

      try {
        const response = await axios.post(
          REGISTER_URL,
          JSON.stringify({ user: id, pwd: pw1 }),
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
        console.log(response.data);
        console.log(response.accessToken);
        console.log(JSON.stringify(response));
        setSuccess(true);
        // clear input fields
      } catch (err) {
        if (!err?.response) {
          setErrMsg("서버 응답 없음");
        } else if (err.response?.status === 409) {
          setErrMsg("이미 존재하는 아이디입니다.");
        } else {
          setErrMsg("회원가입에 실패하였습니다.");
        }
        errRef.current.focus();
      }
    },
    [id, pw1]
  );

  return (
    <>
      {success ? (
        <section>
          <h1>가입 성공</h1>
          <p>
            <a href="#">로그인</a>
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
          <h1>회원가입</h1>
          <form onSubmit={handleSubmit}>
            {/* 아이디 */}
            <label htmlFor="username">
              아이디
              <FontAwesomeIcon
                icon={faCheck}
                className={isIdValid ? "valid" : "hide"}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={isIdValid || !id ? "hide" : "invalid"}
              />
            </label>
            <input
              type="text"
              id="username"
              ref={idRef}
              autoComplete="off"
              onChange={(e) => setId(e.target.value)}
              value={id}
              required
              aria-invalid={isIdValid ? "false" : "true"}
              aria-describedby="uidnote"
              onFocus={() => setIsIdFocused(true)}
              onBlur={() => setIsIdFocused(false)}
            />
            <p
              id="uidnote"
              className={
                isIdFocused && id && !isIdValid ? "instructions" : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              4 ~ 24자여야 합니다.
              <br />
              문자로 시작해야 합니다.
              <br />
              문자, 숫자, 밑줄, 하이픈을 사용할 수 있습니다.
            </p>

            {/* 비밀번호 */}
            <label htmlFor="password">
              비밀번호
              <FontAwesomeIcon
                icon={faCheck}
                className={isPw1Valid ? "valid" : "hide"}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={isPw1Valid || !pw1 ? "hide" : "invalid"}
              />
            </label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPw1(e.target.value)}
              value={pw1}
              required
              aria-invalid={isPw1Valid ? "false" : "true"}
              aria-describedby="pwdnote"
              onFocus={() => setIsPw1Focused(true)}
              onBlur={() => setIsPw1Focused(false)}
            />
            <p
              id="pwdnote"
              className={
                isPw1Focused && !isPw1Valid ? "instructions" : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              8 ~ 24자여야 합니다.
              <br />
              대문자와 소문자, 숫자 및 특수 문자를 포함해야 합니다.
              <br />
              허용되는 특수 문자:
              <span aria-label="exclamation mark">!</span>
              <span aria-label="at symbol">@</span>
              <span aria-label="hashtag">#</span>
              <span aria-label="dollar sign">$</span>
              <span aria-label="percent">%</span>
            </p>

            {/* 비밀번호 확인 */}
            <label htmlFor="confirm_pwd">
              비밀번호 확인
              <FontAwesomeIcon
                icon={faCheck}
                className={isPw2Valid && pw2 ? "valid" : "hide"}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={isPw2Valid || !pw2 ? "hide" : "invalid"}
              />
            </label>
            <input
              type="password"
              id="confirm_pwd"
              onChange={(e) => setPw2(e.target.value)}
              value={pw2}
              required
              aria-invalid={isPw2Valid ? "false" : "true"}
              aria-describedby="confirmnote"
              onFocus={() => setIsPw2Focused(true)}
              onBlur={() => setIsPw2Focused(false)}
            />
            <p
              id="confirmnote"
              className={
                isPw2Focused && !isPw2Valid ? "instructions" : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />첫 번째 암호 입력 필드와
              일치해야 합니다.
            </p>

            {/* 가입 버튼 */}
            <button
              disabled={!isIdValid || !isPw1Valid || !isPw2Valid ? true : false}
            >
              가입하기
            </button>

            <p>
              이미 가입하셨나요?
              <br />
              <span className="line">
                {/*put router link here*/}
                <a href="#">로그인</a>
              </span>
            </p>
          </form>
        </section>
      )}
    </>
  );
};

export default Register;
