import React, { useState } from 'react'
import styled from 'styled-components'
import { memoIdSelector, memoPwSelector, memoUserInfoSelector } from '../../redux/Selector/memoSelectors';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addUserInfo } from '../../redux/Slice/loginSlice';

const SignUpPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const idSelector = useSelector(memoIdSelector);
    const pwSelector = useSelector(memoPwSelector);
    const userInfoSelector = useSelector(memoUserInfoSelector);

    const [id, setId] = useState("")
    const [name, setName] = useState("")
    const [number, setNumber] = useState("")
    const [pw, setPw] = useState("")
    const [confirmPw, setConfirmPw] = useState("")

    const handleOnPasswordInput = (passwordInput) => {
        setPw(passwordInput);
    }

    const handleOnConfirmPasswordInput = (confirmPasswordInput) => {
        setConfirmPw(confirmPasswordInput);
    }
    const doesPasswordMatch = () => {
        return pw === confirmPw
    }

    const renderFeedbackMessage = () => {
        if (confirmPw) {
            if (!doesPasswordMatch()) {
                return (
                    <div>패스워드 불일치</div>
                )
            }
        }
    }

    const toggleLogin = (e) => {
        e.preventDefault();

        if (!name || !number || !id || !doesPasswordMatch()) {
            alert("항목을 제대로 입력해주세요")
            return;
        }

        const meta = {
            name: name,
            number: number,
            id: id,
            pw: pw
        };


        dispatch(addUserInfo(meta));
        // dispatch(closeModal());
        navigate(`/`)

    }

    // const handleOpenLoginModal = () => {
    //     dispatch(
    //         openModal({
    //             modalType: "LoginModal",
    //             isOpen: true,
    //         })
    //     )
    // }



    console.log(`id: ${idSelector}`, `pw: ${pwSelector}`, userInfoSelector);

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
                    {renderFeedbackMessage()}
                </div>
                <div className="login-name">
                    <input type="text" placeholder="이름 입력"
                        value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="login-number">
                    <input type="number" placeholder="전화번호 입력"
                        value={number} onChange={(e) => setNumber(e.target.value)} />
                </div>
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
