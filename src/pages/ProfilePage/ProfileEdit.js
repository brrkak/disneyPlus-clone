import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { delUserInfo, profileEdit } from '../../redux/Slice/loginSlice'
import { memoNumberSelector, memoPwSelector } from '../../redux/Selector/memoSelectors'

const ProfileEdit = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const [name, setName] = useState("")
    const [pw, setPw] = useState("")
    const [show, setShow] = useState(false)
    const [number, setNumber] = useState("")
    const pwSelector = useSelector(memoPwSelector)
    const numberSelector = useSelector(memoNumberSelector)
    const renderFeedbackMessage = () => {
        if (name.length < 2) {
            return (
                <div>조건에 맞게 입력하세요.</div>
            )
        } else {
            return null
        }
    }

    const handleEdit = (e) => {
        e.preventDefault();

        const meta = {
            name: name,
            pw: pw,
        }
        if (!renderFeedbackMessage()) {
            dispatch(profileEdit(meta))
            navigate("/profile")
        } else {
            return
        }
    }
    const handleDel = (e) => {
        e.preventDefault();

        console.log(pw, number);
        console.log(pwSelector);
        const meta = {
            number: number,
            pw: pw,
        }
        if (pwSelector === pw || numberSelector === number) {
            dispatch(delUserInfo(meta))
            navigate("/")
        }
        else {
            alert("비밀번호 또는 전화번호가 다릅니다.")
        }

    }



    return (
        show ? (
            <form style={{ position: 'absolute', top: '150px' }} onSubmit={(e) => handleDel(e)}>
                <input type="number" placeholder='- 없이 휴대전화 번호를 입력하세요.'
                    value={number} onChange={(e) => setNumber(e.target.value)} />
                <input type="password" placeholder="비밀번호를 입력하세요"
                    value={pw} onChange={(e) => setPw(e.target.value)} />
                <button>확인</button>
            </form>) :
            (<Container>
                <h1> 프로필 수정 </h1>
                {renderFeedbackMessage()}
                <form onSubmit={(e) => handleEdit(e)}>
                    <div>
                        <input type="text" placeholder='이름을 최소 두글자 입력하세요.'
                            value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div>
                        <input type="number" placeholder='비밀번호를 다시 입력해주세요'
                            value={pw} onChange={(e) => setPw(e.target.value)} />
                    </div>
                    <button>확인</button>
                    <button onClick={() => navigate("/profile")}>뒤로</button>
                    <button onClick={() => setShow(true)}>계정 삭제</button>
                </form>
            </Container>
            )
    )
}

export default ProfileEdit

const Container = styled.div`
position: absolute;
left: 150px;
top: 150px`