import React, { useState } from 'react'
import styled from 'styled-components'
import { memoIdSelector, memoPwSelector, memoUserInfoSelector } from '../../redux/Selector/memoSelectors';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addUserInfo } from '../../redux/Slice/loginSlice';
import "./SignupPage.css"
import zxcvbn from 'zxcvbn';

const SignUpPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [id, setId] = useState("")
    const [name, setName] = useState("")
    const [number, setNumber] = useState("")
    const [pw, setPw] = useState("")
    const [confirmPw, setConfirmPw] = useState("")
    const [passwordScore, setPasswordScore] = useState("")

    const handleOnPasswordInput = (passwordInput) => {
        const { score } = zxcvbn(passwordInput)
        setPw(passwordInput);
        setPasswordScore(score)
    }


    const handleOnConfirmPasswordInput = (confirmPasswordInput) => {
        setConfirmPw(confirmPasswordInput);
    }
    const doesPasswordMatch = () => {
        return pw === confirmPw

    }
    const doesProfileConfirm = () => {
        return (number.length < 11 || name.length < 2) === false
    }

    const renderFeedbackMessage = () => {
        let message, className;

        switch (passwordScore) {
            case 0:
                message = 'Way too weak!';
                className = 'text-danger';
                break;
            case 1:
                message = 'Weak strength!';
                className = 'text-danger';
                break;
            case 2:
                message = 'Moderate strength!';
                className = 'text-warning';
                break;
            case 3:
                message = 'Good strength!';
                className = 'text-success';
                break;
            case 4:
                message = 'Powerful strength!';
                className = 'text-primary';
                break;
            default:
                message = '';
                break;
        }
        return (
            <small id="passwordHelp" className={`${className}`}>
                <span>{`${message}`}</span>
            </small>)
    }


    const renderFeedbackPassWord = () => {
        if (confirmPw) {
            if (!doesPasswordMatch()) {
                return (
                    <span>패스워드 불일치</span>
                )
            }
        }
    }

    const renderFeedbackProfile = () => {
        if (!doesProfileConfirm()) {
            return (
                <span>조건에 맞게 입력하세요.</span>
            )
        }
    }

    const toggleLogin = (e) => {
        e.preventDefault();

        if (!name || !number || !id || !doesPasswordMatch() || !doesProfileConfirm()) {
            alert("항목을 제대로 입력해주세요")
            return;
        }

        const meta = {
            name: name,
            number: number,
            id: id,
            pw: pw
        };

        if (!renderFeedbackProfile() || !renderFeedbackPassWord()) {
            dispatch(addUserInfo(meta));
            navigate(`/`)
        }

    }

    return (
        <Container>
            <img className="signUp_logo_img"
                src="/images/logo.svg"
                alt="Disney Plus App" />
            <Contents>
                <h1 className='heading_title'>회원 가입</h1>
                <form className='signUp_container' onSubmit={(e) => toggleLogin(e)}>
                    <div className="signUp_email">
                        <TextInput type="text" id="email_input" name="email"
                            value={id} onChange={(e) => setId(e.target.value)} required />
                        <Label htmlFor="email_input"><span>이메일</span></Label>
                    </div>
                    <div className="signUp_password">
                        <TextInput type="password" id='pw_input' name='pw'
                            value={pw} onChange={(e) => handleOnPasswordInput(e.target.value)} required />
                        <Label htmlFor="pw_input"><span>비밀번호</span></Label>
                    </div>
                    <div className="signUp_confirmPw">
                        <TextInput type="password" id='confirmPw_input' name='confirmPw'
                            value={confirmPw} onChange={(e) => handleOnConfirmPasswordInput(e.target.value)} required />
                        <Label htmlFor="confirmPw_input"><span>비밀번호 확인</span></Label>
                        {renderFeedbackPassWord()}
                    </div>
                    {renderFeedbackMessage()}
                    <userinfo className="signUp_userInfo">
                        <h2 className='heading_title'>프로필</h2>
                        <div className="signUp_name">
                            <TextInput type="text" placeholder="이름을 최소 두글자 이상 입력하세요."
                                value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="signUp_number">
                            <TextInput type="number" placeholder="- 없이 휴대전화 번호를 입력하세요."
                                value={number} onChange={(e) => setNumber(e.target.value)} />
                        </div>
                    </userinfo>

                    {renderFeedbackProfile()}
                    <div className='signUp_btn'>
                        <button id='signUpEnter_btn' type='submit'>확인</button>
                    </div>
                </form>
                <div className='back_btn' id='signUp_back' onClick={() => navigate("/login")}>
                    <span className='material-symbols-outlined'></span>
                </div>
            </Contents>

        </Container>
    )
}

export default SignUpPage

const Container = styled.div`
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
const TextInput = styled.input``

const Label = styled.label``

