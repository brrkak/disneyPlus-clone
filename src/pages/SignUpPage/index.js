import React, { useState } from 'react'
import styled from 'styled-components'
import { memoIdSelector, memoPwSelector, memoUserInfoSelector } from '../../redux/Selector/memoSelectors';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addUserInfo } from '../../redux/Slice/loginSlice';
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
                {`${message}`}
            </small>)
    }


    const renderFeedbackPassWord = () => {
        if (confirmPw) {
            if (!doesPasswordMatch()) {
                return (
                    <div>패스워드 불일치</div>
                )
            }
        }
    }

    const renderFeedbackProfile = () => {
        if (!doesProfileConfirm()) {
            return (
                <div>조건에 맞게 입력하세요.</div>
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
            <h1>회원 가입</h1>
            <form onSubmit={(e) => toggleLogin(e)}>
                <div className="login-id">
                    <div>
                        <input type="email" placeholder="이메일 입력"
                            value={id} onChange={(e) => setId(e.target.value)} />
                    </div>
                </div>
                <div className="login-pw">
                    <input type="password" placeholder="패스워드 생성"
                        value={pw} onChange={(e) => handleOnPasswordInput(e.target.value)} />
                    <input type="password" placeholder="패스워드 확인"
                        value={confirmPw} onChange={(e) => handleOnConfirmPasswordInput(e.target.value)} />
                    {renderFeedbackPassWord()}
                </div>
                {renderFeedbackMessage()}


                <div className="login-name">
                    <input type="text" placeholder="이름을 최소 두글자 이상 입력하세요."
                        value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="login-number">
                    <input type="number" placeholder="- 없이 휴대전화 번호를 입력하세요."
                        value={number} onChange={(e) => setNumber(e.target.value)} />
                </div>
                {renderFeedbackProfile()}
                <div>
                    <button type='submit'>확인</button>
                </div>
            </form>
            <button onClick={() => navigate("/login")}> 뒤로가기 </button>
        </Container>
    )
}

export default SignUpPage

const Container = styled.div``
