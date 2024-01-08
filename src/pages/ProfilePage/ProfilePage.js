import { useSelector } from 'react-redux'
import { memoIdSelector, memoNameSelector, memoNumberSelector, memoPwSelector } from '../../redux/Selector/memoSelectors'
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const ProfilePage = () => {
    const [show, setShow] = useState(false)
    const [pw, setPw] = useState("")

    const navigate = useNavigate();
    const idSelector = useSelector(memoIdSelector);
    const pwSelector = useSelector(memoPwSelector);
    const nameSelector = useSelector(memoNameSelector)
    const numberSelector = useSelector(memoNumberSelector)

    const handleEditProfile = (e) => {
        e.preventDefault();

        if (pwSelector === pw) {
            navigate("edit")
        } else {
            alert("비밀번호가 다릅니다.")
        }
    }


    return (show ?
        (<Container>
            <h2>비밀번호를 한번 더 입력해주세요.</h2>
            <form style={{ width: "500px" }} onSubmit={(e) => handleEditProfile(e)}>
                <input value={pw} onChange={(e) => setPw(e.target.value)} type="text" placeholder='비밀번호를 입력하세요' />
                <button onSubmit={(e) => handleEditProfile(e)}>확인</button>
            </form>
            <button onClick={() => setShow(false)}>뒤로 가기</button>
        </Container>)
        : (<Container>
            <div className="profile-name" >
                <span>NAME </span>:
                {nameSelector}
            </div >
            <div className="profile-pw">
                <span>PW </span>:
                {pwSelector}
            </div>
            <div className="profile-number">
                <span>NUMBER </span>:
                {numberSelector}
            </div>
            <div className="profile-id">
                <span>ID </span>:
                {idSelector}
            </div>
            <button onClick={() => setShow(true)}>프로필 수정</button>
        </Container >))


};

const Container = styled.div`
position: relative;
left: 250px;
top: 250px;`

export default ProfilePage
