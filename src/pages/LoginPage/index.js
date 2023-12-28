import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  memoIdSelector,
  memoLoginAuthSelector,
  memoPwSelector,
  memoUserInfoSelector
} from "../../redux/Selector/memoSelectors"
import { authAsync, login } from "../../redux/Slice/loginSlice"
import { closeModal, openModal } from "../../redux/Slice/modalSlice";
import { useLoginMutation } from "../../redux/Slice/auth/authApiSlice";
import { setCredentials } from "../../redux/Slice/auth/authSlice";



const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const idRef = useRef();
  const errRef = useRef();

  const [id, setId] = useState("")
  const [pw, setPw] = useState("")
  const [errorMg, setErrorMg] = useState("")
  const [login, { isLoading }] = useLoginMutation()

  // const idSelector = useSelector(memoIdSelector);
  // const pwSelector = useSelector(memoPwSelector);
  // const userInfoSelector = useSelector(memoUserInfoSelector);
  // const authSelector = useSelector(memoLoginAuthSelector)
  const passwordRef = useRef(null)


  useEffect(() => {
    setErrorMg('')
  }, [id, pw])

  useEffect(() => {
    idRef.current.focus()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    // sumit API
    try {
      const userData = await login({ id, pw }).unwrap()
      dispatch(setCredentials({ ...userData, id }))
      setId('')
      setPw('')
      navigate('/main')
    } catch (err) {
      if (!err?.originalStatus) {
        // isLoading: true until timeout occurs
        setErrorMg('No Server Response');
      } else if (err.originalStatus === 400) {
        setErrorMg('Missing Username or Password');
      } else if (err.originalStatus === 401) {
        setErrorMg('Unauthorized');
      } else {
        setErrorMg('Login Failed');
      }
      errRef.current.focus();
    }
  }

  const handleIdInput = (e) => setId(e.target.value)
  const handlePwInput = (e) => setPw(e.target.value)
  const [isShowPwChecked, setShowPwChecked] = useState(false)



  const handleShowPwChecked = () => {
    const password = passwordRef.current
    if (password == null) return

    setShowPwChecked(!isShowPwChecked)
    if (!isShowPwChecked) {
      password.type = `text`;
    } else {
      password.type = `password`
    }
  }


  const content = isLoading ? <h1>Loading...</h1> :
    (
      <Container>
        <h1>로그인</h1>

        <form onSubmit={handleSubmit}>
          <p ref={errRef} className={errorMg ? "errrmg" : "offscreen"} aria-live="assertive">{errorMg}</p>
          <div className="login-id">
            <div>
              <input type="id" placeholder="아이디를 입력하세요"
                value={id} ref={idRef} maxLength={16} onChange={handleIdInput} autoComplete="off" required />
            </div>
          </div>
          <div className="login-pw">
            <input type="password" placeholder="비밀번호를 입력하세요"
              value={pw} ref={passwordRef} onChange={handlePwInput} required />
          </div>
          <label>
            <input type="checkbox" onChange={handleShowPwChecked} />
            <span className="show_pw_title">비밀번호 보기</span>
          </label>
          <div className="login-btn">
            <button id="login-btnId" onSubmit={handleSubmit}>로그인</button>
          </div>
        </form>
        <div className="IdPwBtn">
          <button id="IdPwSearch">
            ID/PW찾기
          </button>
        </div>
        <div className="signUpBtn">
          <button onClick={() => navigate("signup")} id="signUp">
            회원가입
          </button>
        </div>
      </Container>
    )
  return content
};

export default LoginPage;

const Container = styled.div``