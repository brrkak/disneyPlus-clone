import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import styled from 'styled-components'
import { memoUserInfoSelector } from '../../redux/Selector/memoSelectors'
import { userSearch } from '../../redux/Slice/loginSlice'
import "./UserSearchPage.css"
const UserSearchPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [name, setName] = useState("")
    const [number, setNumber] = useState("")
    const [show, setShow] = useState(false)
    const userInfoSelector = useSelector(memoUserInfoSelector)
    const error = useSelector((state) => state.persistedReducer.login.error)

    const user = userInfoSelector.find(user => user.name === name && user.number === number)

    const toggleSearch = (e) => {
        e.preventDefault();
        if (!name || !number) {
            alert("내용을 입력하세요.")
            return;
        }
        const meta = {
            name: name,
            number: number,
        }
        dispatch(userSearch(meta));
        setShow(true);
    }

    return (show ?
        <Container>
            <img className="login_logo_img"
                src="/images/logo.svg"
                alt="Disney Plus App" />
            <Contents className="contents_box">
                {error ?
                    <div className='heading_title'> 유저의정보를 불러오지못했습니다.</div> :
                    <div className='userSearch_userInfo'>
                        <span>ID: {user.id}</span>
                        <span>PW: {user.pw}</span>
                    </div>}
            </Contents>
        </Container>
        :
        <Container>
            <img className="login_logo_img"
                src="/images/logo.svg"
                alt="Disney Plus App" />
            <Contents className="contents_box">
                <h1 className='heading_title'>ID/PW찾기</h1>
                <form className="userSearch_container" onSubmit={(e) => toggleSearch(e)}>
                    <div className='userSearch_name'>
                        <TextInput type="text" id='name' name='name' value={name} onChange={(e) => setName(e.target.value)} required />
                        <Label htmlFor='name'><span>이름</span></Label>
                    </div>
                    <div className='userSearch_number'>
                        <TextInput type="number" id='number' name='number' value={number}
                            onWheel={(e) => e.target.blur()} onChange={(e) => setNumber(e.target.value)} required />
                        <Label htmlFor='number'><span>전화번호</span></Label>
                    </div>
                </form>
                <div className='userSearch_btn' onClick={(e) => toggleSearch(e)}>
                    <button id='userSearchEnter_btn' type='submit'>확인</button>
                </div>

                <div className='back_btn' id='userSearch_back' onClick={() => navigate("/login")}>
                    <span className='material-symbols-outlined'></span>
                </div>

            </Contents>

        </Container>

    )
}

export default UserSearchPage

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
margin: 100px 0 0 0;
padding: 40px 72px 80px 72px;
background-color: #ffffff;
position: absolute;
top:50px;
`
const TextInput = styled.input`
margin: 0;
appearance: none;
-webkit-appearance: none;`

const Label = styled.label``