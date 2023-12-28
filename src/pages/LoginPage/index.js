import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { loginEmail, signupEmail } from "../../firebase";
const LoginPage = () => {

  const button = document.getElementById(`login-btn`)

  buttons.addEventListener('click', (e) => {
    e.preventDefault();
    if (e.target.id == 'signin') {
      loginEmail(email.value, pw.value).then((result) => {
        console.log(result);
        const user = result.user;
        loginSuccess(user.email, user.uid);
      });
    } else if (e.target.id == 'signup') {
      signupEmail(email.value, password.value) //
        .then((result) => {
          const user = result.user;
          loginSuccess(user.email, user.uid);
        })
        .catch((error) => console.log(error));
    }
  });
  //로그인 성공시 UI 변경
  const loginSuccess = (email, uid) => {
    const login_area = document.getElementById('login-area');
    login_area.innerHTML = `<h2>Login 성공!</h2><div>uid: ${uid}</div><div>email: ${email}</div>`;
  };
  return (
    <Container>
      <h1>로그인</h1>
      <form>
        <div className="login-id">
          <div>
            <input type="id" placeholder="아이디를 입력하세요"
            />
          </div>
        </div>
        <div className="login-pw">
          <input type="password" placeholder="비밀번호를 입력하세요"
          />
        </div>
        <label>
          <input type="checkbox" />
          <span className="show_pw_title">비밀번호 보기</span>
        </label>
        <div className="login-btn">
          <button id="login-btnId">로그인</button>
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