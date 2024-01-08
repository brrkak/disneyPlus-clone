import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import styled from 'styled-components'
import { memoUserInfoSelector } from '../../redux/Selector/memoSelectors'
import { userSearch } from '../../redux/Slice/loginSlice'
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
            {error ?
                <div> 유저의정보를 불러오지못했습니다.</div> :
                <div>
                    ID: {user.id}
                    PW: {user.pw}
                </div>}
        </Container>
        :
        <Container>
            <h1>ID/PW찾기</h1>
            <form onSubmit={(e) => toggleSearch(e)}>
                <div>
                    이름입력 :
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='이름' />
                </div>
                <div>
                    전화번호 입력:
                    <input type="text" value={number} onChange={(e) => setNumber(e.target.value)} placeholder='전화번호' />
                </div>
            </form>
            <button onClick={(e) => toggleSearch(e)}> 확 인 </button>
            <button onClick={() => navigate("/login")}> 뒤로 가기 </button>
        </Container>

    )
}

export default UserSearchPage

const Container = styled.div`
position: absolute;
left: 250px;`