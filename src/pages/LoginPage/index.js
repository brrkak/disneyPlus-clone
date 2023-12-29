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
import { auth, authAsync, login } from "../../redux/Slice/loginSlice"
import { token } from "../../api/auth"


const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const idSelector = useSelector(memoIdSelector);
  const pwSelector = useSelector(memoPwSelector);
  const userInfoSelector = useSelector(memoUserInfoSelector);
  const authSelector = useSelector(memoLoginAuthSelector)
  const passwordRef = useRef(null)

  const [id, setId] = useState("")
  const [pw, setPw] = useState("")
  const [errorMg, setErrorMg] = useState("")
  const [isShowPwChecked, setShowPwChecked] = useState(false)

  console.log(userInfoSelector[0]);
  console.log(authSelector);


  // useEffect(() => {
  //   dispatch(authAsync())
  //     .then((response) => {
  //       console.log("###response", response);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       setErrorMg("###ERROR", error.message)
  //     })

  // }, [dispatch])


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
    dispatch(auth())
    if (authSelector === true) {
      console.log("true");
      navigate("/main")
    } else {
      console.log("false");
      navigate("/")
    }

  }



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


  console.log(`id: ${idSelector}`, `pw: ${pwSelector}`, userInfoSelector);

  return (
    <Container>
      <h1>로그인</h1>
      <form onSubmit={(e) => toggleLogin(e)}>
        <div className="login-id">
          <div>
            <input type="id" placeholder="아이디를 입력하세요"
              value={id} maxLength={16} onChange={(e) => setId(e.target.value)} />
          </div>
        </div>
        <div className="login-pw">
          <input type="password" placeholder="비밀번호를 입력하세요"
            value={pw} ref={passwordRef} onChange={(e) => setPw(e.target.value)} />
        </div>
        <label>
          <input type="checkbox" onChange={handleShowPwChecked} />
          <span className="show_pw_title">비밀번호 보기</span>
        </label>
        <div className="login-btn">
          <button id="login-btnId" onSubmit={(e) => toggleLogin(e)}>로그인</button>
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
};

export default LoginPage;

const Container = styled.div``