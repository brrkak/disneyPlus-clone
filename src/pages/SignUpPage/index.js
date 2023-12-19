import React, { useState } from 'react'
import styled from 'styled-components'
import { memoIdSelector, memoLogoutSelector, memoPwSelector, memoUserInfoSelector } from '../../redux/Selector/memoSelectors';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addUserInfo } from '../../redux/Slice/loginSlice';
import { profile } from '../../redux/Slice/profileSlice';
import { closeModal, openModal } from '../../redux/Slice/modalSlice';

const SignUpPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const idSelector = useSelector(memoIdSelector);
    const pwSelector = useSelector(memoPwSelector);
    const userInfoSelector = useSelector(memoUserInfoSelector);


    const [id, setId] = useState("")
    const [pw, setPw] = useState("")
    const [name, setName] = useState("")
    const [number, setNumber] = useState("")



    const toggleLogin = (e) => {
        e.preventDefault();

        if (!name || !number || !id || !pw) {
            alert("모든 항목을 입력하세요.")
            return;
        }

        const meta = {
            name: name,
            number: number,
            id: id,
            pw: pw
        };

        dispatch(profile(meta));
        dispatch(addUserInfo(meta));
        dispatch(closeModal());
        navigate(`/main`);
    }
    const handleOpenLoginModal = () => {
        dispatch(
            openModal({
                modalType: "LoginModal",
                isOpen: true,
            })
        )
    }


    console.log(`id: ${idSelector}`, `pw: ${pwSelector}`, userInfoSelector);

    return (
        <Container>
            <h1>회원 가입</h1>
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
                <div className="login-name">
                    <input type="text" placeholder="이름을 입력하세요"
                        value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="login-number">
                    <input type="number" placeholder="전화번호를 입력하세요"
                        value={number} onChange={(e) => setNumber(e.target.value)} />
                </div>
                <div>
                    <button type='submit'>확인</button>
                </div>
            </form>
            <button onClick={handleOpenLoginModal}> 뒤로가기 </button>
        </Container>
    )
}

export default SignUpPage

const Container = styled.div``
