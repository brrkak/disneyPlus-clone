import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  memoIdSelector,
  memoPwSelector,
  memoUserInfoSelector
} from "../../redux/Selector/memoSelectors"
import { login } from "../../redux/Slice/loginSlice"
import { closeModal, openModal } from "../../redux/Slice/modalSlice";


const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const idSelector = useSelector(memoIdSelector);
  const pwSelector = useSelector(memoPwSelector);
  const userInfoSelector = useSelector(memoUserInfoSelector);


  const [id, setId] = useState("")
  const [pw, setPw] = useState("")



  const toggleLogin = (e) => {
    e.preventDefault();

    if (!id || !pw) {
      alert("내용을 입력하세요.")
      return;
    }

    const meta = {
      id: id,
      pw: pw
    };

    dispatch(login(meta));
    dispatch(closeModal());
    navigate(`/main`);
  }


  const handleOpenSignUpModal = () => {
    dispatch(
      openModal({
        modalType: "SignUpModal",
        isOpen: true,
      })
    )
  }



  console.log(`id: ${idSelector}`, `pw: ${pwSelector}`, userInfoSelector);

  return (
    <Container>
      <h1>로그인</h1>
      <form onSubmit={(e) => toggleLogin(e)}>
        <div className="login-id">
          <div>
            <input type="id" placeholder="아이디를 입력하세요"
              value={id} onChange={(e) => setId(e.target.value)} />
          </div>
        </div>
        <div className="login-pw">
          <input type="password" placeholder="비밀번호를 입력하세요"
            value={pw} onChange={(e) => setPw(e.target.value)} />
        </div>
        <div className="login-btn">
          <button id="login-btnId" onClick={toggleLogin}>로그인</button>
        </div>
      </form>
      <div className="IdPwBtn">
        <button id="IdPwSearch">
          ID/PW찾기
        </button>
      </div>
      <div className="signUpBtn">
        <button onClick={handleOpenSignUpModal} id="signUp">
          회원가입
        </button>
      </div>
    </Container>
  )
};

export default LoginPage;

const Container = styled.div``