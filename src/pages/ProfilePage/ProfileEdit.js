import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { delUserInfo, profileEdit } from '../../redux/Slice/loginSlice'
import { memoNumberSelector, memoPwSelector } from '../../redux/Selector/memoSelectors'
import "./ProfileEdit.css"
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
            <Container>
                <Contents>
                    <form className='profileDel_container' onSubmit={(e) => handleDel(e)}>
                        <div className='profileDel_number'>
                            <TextInput type="number" id='delNumber' name='delNumber' onWheel={(e) => e.target.blur()}
                                value={number} onChange={(e) => setNumber(e.target.value)} required />
                            <Label htmlFor='delNumber'><span>- 없이 휴대전화 번호를 입력하세요.</span></Label>
                        </div>
                        <div className='profileDel_password'>
                            <TextInput type="password" id='delPassword' name='delPassword'
                                value={pw} onChange={(e) => setPw(e.target.value)} required />
                            <Label htmlFor='delPassword'><span>비밀번호를 입력하세요</span></Label>
                        </div>
                        <button className='profileDel_btn'>확인</button>
                        <div className='back_btn' id='profileEdit_back' onClick={() => setShow(false)}>
                            <span className='material-symbols-outlined'></span></div>
                    </form>
                </Contents>
            </Container>) :
            (<Container>
                <Contents>
                    <h1 className='heading_title'> 프로필 수정 </h1>
                    {renderFeedbackMessage()}
                    <Profile>
                        <form className='profileEdit_container' onSubmit={(e) => handleEdit(e)}>
                            <div className='profileEdit_name'>
                                <TextInput id='name' name="name" type="text"
                                    value={name} onChange={(e) => setName(e.target.value)} required />
                                <Label htmlFor="name"><span>이름을 최소 두글자 입력하세요.</span></Label>
                            </div>
                            <div className='profileEdit_password'>
                                <TextInput id='password' name="password" type="number"
                                    onWheel={((e) => e.target.blur())}
                                    value={pw} onChange={(e) => setPw(e.target.value)} required />
                                <Label htmlFor="password"><span>비밀번호를 다시 입력해주세요</span></Label>
                            </div>
                            <button className='profile_edit_btn'>확인</button>
                            <div className='back_btn' id='profileEdit_back' onClick={() => navigate("/profile")}>
                                <span className='material-symbols-outlined'></span></div>
                            <button className="profileDel_btn" onClick={() => setShow(true)}>계정 삭제</button>
                        </form>
                    </Profile>

                </Contents>

            </Container>
            )
    )
}

export default ProfileEdit

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

const Profile = styled.div``

const TextInput = styled.input``
const Label = styled.label``