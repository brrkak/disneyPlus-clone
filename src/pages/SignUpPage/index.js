import React, { useState } from 'react'
import styled from 'styled-components'
import { memoUserInfoSelector } from '../../redux/Selector/memoSelectors';
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
    const infoSel = useSelector(memoUserInfoSelector)

    // 이메일 입력
    const handleOnConfrimEmail = (confirmEmailInput) => {
        // 이메일 입력을 state로 옮김.
        setId(confirmEmailInput)
    }

    const doesEmailMatch = () => {
        // 이메일 유효성검사.
        let regex = new RegExp(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/);
        return regex.test(id) === true
    }

    const renderFeedbackEmail = () => {
        // 아이디 중복 검사
        const emailDuplicate = infoSel.findIndex(user => user.id === id)

        // 아이디  피드백
        if ((id && emailDuplicate !== 0) || id.trim() === "") {
            if (doesEmailMatch()) {
                return (
                    <small id="emailHelp" className={`text-success`}>
                        <span>사용 가능한 아이디입니다.</span>
                        <div className="material-symbols-outlined" id="check_success">Done</div>
                    </small>)

            }
            else {
                return (
                    <small id="emailHelp" className={`text-danger`}>
                        <span>조건에 맞게 입력해주세요.</span>
                        <div className="material-symbols-outlined" onClick={() => setId("")} id="check_danger">Close</div>
                    </small>)
            }
        }
        return (
            <small id="emailHelp" className={`text-danger`}>
                <span>이미 사용중인 아이디입니다.</span>
                <div className="material-symbols-outlined" onClick={() => setId("")} id="check_danger">Close</div>
            </small>)


    }

    // 패스워드 입력
    const handleOnPasswordInput = (passwordInput) => {
        // 패스워드 강도 체크
        const { score } = zxcvbn(passwordInput)
        // 패스워드와 패스워드 강도체크를 state로 옮김
        setPw(passwordInput);
        setPasswordScore(score)
    }

    // 패스워드 확인 입력
    const handleOnConfirmPasswordInput = (confirmPasswordInput) => {
        setConfirmPw(confirmPasswordInput);
    }
    // 패스워드와 패스워드 확인 일치여부
    const doesPasswordMatch = () => {
        return pw === confirmPw

    }

    //  패스워드 확인 피드백
    const renderFeedbackConfirmPw = () => {
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

    // 패스워드 피드백
    const renderFeedbackPassWord = () => {
        if (confirmPw) {
            if (!doesPasswordMatch()) {
                return (
                    <span className='signUp_confirmPw_rejcet'>패스워드 불일치</span>
                )
            }
        }
    }

    // 프로필 피드백
    const renderFeedbackProfile = () => {
        if (!doesProfileConfirm()) {
            return (
                <span className='signUp_profile_check'>조건에 맞게 입력하세요.</span>
            )
        }
    }
    // 프로필 유효성검사
    const doesProfileConfirm = () => {
        return (number.length < 11 || name.length < 2) === false
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
                            value={id} onChange={(e) => handleOnConfrimEmail(e.target.value)} required />
                        <Label htmlFor="email_input"><span>이메일</span></Label>
                        {renderFeedbackEmail()}
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
                        {renderFeedbackConfirmPw()}
                    </div>

                    <userinfo className="signUp_userInfo">
                        <h2 className='heading_title'>프로필</h2>
                        <div className="signUp_name">
                            <TextInput type="text" placeholder="이름을 최소 두글자 이상 입력하세요."
                                value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="signUp_number">
                            <TextInput type="number" placeholder="- 없이 휴대전화 번호를 입력하세요."
                                value={number} onWheel={(e) => e.target.blur()} onChange={(e) => setNumber(e.target.value)} />
                        </div>
                        {renderFeedbackProfile()}
                    </userinfo>

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
height: 580px;
margin: 100px 0 0 0;
padding: 40px 72px 80px 72px;
background-color: #ffffff;
position: absolute;
top:50px;
`
const TextInput = styled.input``

const Label = styled.label``

