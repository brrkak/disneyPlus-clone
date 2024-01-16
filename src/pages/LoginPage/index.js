import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  memoLoginAuthSelector,
} from "../../redux/Selector/memoSelectors"
import { login } from "../../redux/Slice/loginSlice"
import "./LoginPage.css"


const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const authSelector = useSelector(memoLoginAuthSelector)
  const passwordRef = useRef(null)
  const [id, setId] = useState("")
  const [pw, setPw] = useState("")
  const [isShowPwChecked, setShowPwChecked] = useState(false)
  const [visibility, setVisibility] = useState("visibility")

  const handleOnConfrimEmail = (confirmEmailInput) => {
    setId(confirmEmailInput)
  }

  const doesEmailMatch = () => {
    let regEmail = new RegExp(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/);
    return regEmail.test(id) === true
  }

  const renderFeedbackEmail = () => {

    if (id) {
      if (!doesEmailMatch()) {
        return (
          <small id="emailHelp" className={`text-danger`}>
            <span>조건에 맞게 입력해주세요.</span>
            <div className="material-symbols-outlined" onClick={() => setId("")} id="check_danger">Close</div>
          </small>)
      }
    }

  }

  const toggleLogin = (e) => {
    e.preventDefault();

    if (!id || !pw) {
      alert("내용을 입력하세요.")
      return;
    }

    const meta = {
      id: id,
      pw: pw,
    };

    dispatch(login(meta))

  }

  useEffect(() => {
    if (authSelector === true) {
      navigate('/main')
    } else {
      navigate('/login')
    }
  }, [authSelector, navigate])


  const handleShowPwChecked = () => {
    const password = passwordRef.current

    if (password == null) return

    setShowPwChecked(!isShowPwChecked)
    if (!isShowPwChecked) {
      password.type = `text`;
      setVisibility("visibility_off")
    } else {
      password.type = `password`
      setVisibility("visibility")
    }
  }


  return (
    <Container>
      <img className="login_logo_img"
        src="/images/logo.svg"
        alt="Disney Plus App" />
      <Contents>
        <h1 className="heading_title">로그인</h1>
        <form className="login_container" onSubmit={(e) => toggleLogin(e)}>
          <div className="login_email">

            <TextInput type="text" id="email" name="email"
              value={id} onChange={(e) => handleOnConfrimEmail(e.target.value)} required />
            <Label htmlFor="email"><span>이메일</span></Label>
            {renderFeedbackEmail()}
          </div>
          <div className="login_password">

            <TextInput type="password" name="password" id="password"
              value={pw} ref={passwordRef} onChange={(e) => setPw(e.target.value)} required />
            <Label htmlFor="password"><span>비밀번호</span></Label>
            <div className="material-symbols-outlined" onClick={handleShowPwChecked}>{visibility}</div>
          </div>
          <div className="login_btn">
            <button id="loginEnter_btn">로그인</button>
          </div>
        </form>
        <div className="btn_group">
          <div className="userSearch_btn">
            <button onClick={() => navigate("usersearch")} id="IdPwSearch">
              로그인에 문제가 있나요?
            </button>
          </div>
          <div className="signup_btn">
            <button onClick={() => navigate("signup")} id="signUp">
              회원가입을 하려면 여기를 클릭하세요.
            </button>
          </div>
        </div>
      </Contents>

    </Container >
  )
};

export default LoginPage;

const Container = styled.main`
display: flex;
flex-direction: column;
justify-content : flex-start;
min-height: calc(110vh - 250px);
height: 100%;
overflow-x: hidden;
top: 72px;
padding: 0 calc(3.5vw + 5px);
align-items: center;


&::after {
    background: url("/images/login-background.png") center center / cover
      no-repeat fixed;
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    inset: 0px;
    opacity: 1;
    z-index: -1;
    `

const Contents = styled.div`

border-radius: 24px 24px 24px 24px;
width: 580px;
margin: 100px 0 0 0;
padding: 40px 72px 80px 72px;
background-color: #ffffff;
position: absolute;
top:50px;
`

const Label = styled.label``

const TextInput = styled.input`
margin: 0;
appearance: none;
-webkit-appearance: none;
  `
