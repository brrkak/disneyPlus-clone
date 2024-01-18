import { useDispatch, useSelector } from 'react-redux'
import { memoIdSelector, memoNameSelector, memoNumberSelector, memoProfileImageSelector, memoPwSelector } from '../../redux/Selector/memoSelectors'
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import "./ProfilePage.css"
import { upload } from '../../redux/Slice/profileImage';


const ProfilePage = () => {
    const [show, setShow] = useState(false)
    const [profile, setProfile] = useState(false)
    const [pw, setPw] = useState("")

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const idSelector = useSelector(memoIdSelector);
    const pwSelector = useSelector(memoPwSelector);
    const nameSelector = useSelector(memoNameSelector)
    const numberSelector = useSelector(memoNumberSelector)
    const profileImageSelector = useSelector(memoProfileImageSelector)

    const handleEditProfile = (e) => {
        e.preventDefault();

        if (pwSelector === pw) {
            navigate("edit")
        } else {
            alert("비밀번호가 다릅니다.")
        }
    }
    const handleProfileImage = (e) => {

        // 사진들의 각각의 이미지 소스 dispatch
        return (
            dispatch(upload(e.target.src)),
            setProfile(false)
        )
    }


    return (show ?
        (<Container>
            <Contents className="contents_box">
                <h2 className='heading_title'>비밀번호를 한번 더 입력해주세요.</h2>
                <form className='profile_passwordConfirm_container' onSubmit={(e) => handleEditProfile(e)}>
                    <div className="profile_passwordConfirm">
                        <TextInput id='password' name='password' value={pw} onChange={(e) => setPw(e.target.value)} type="password" required />
                        <Label htmlFor="password"><span>비밀번호</span></Label>
                    </div>
                    <button className='profile_edit_btn' onSubmit={(e) => handleEditProfile(e)}>확인</button>
                </form>
                <div className='back_btn' id='profile_passwordConfirm_back' s onClick={() => setShow(false)}>
                    <span className='material-symbols-outlined'></span>
                </div>

            </Contents>


        </Container>)
        : (<Container>
            <Contents className="contents_box">
                <h1 className='heading_title'>프로필 정보</h1>
                <Profile>
                    {/* 프로필 사진  */}
                    <div className='profile_character'>
                        {profile ? (
                            <div className='profile_character_edit'>
                                <img onClick={(e) => handleProfileImage(e)} src="/profile/profileImage1.svg" alt="char1" />
                                <img onClick={(e) => handleProfileImage(e)} src="/profile/profileImage2.svg" alt="char2" />
                                <img onClick={(e) => handleProfileImage(e)} src="/profile/profileImage3.svg" alt="char3" />
                                <img onClick={(e) => handleProfileImage(e)} src="/profile/profileImage4.svg" alt="char4" />
                                <img onClick={(e) => handleProfileImage(e)} src="/profile/profileImage5.svg" alt="char5" />
                                <img onClick={(e) => handleProfileImage(e)} src="/profile/profileImage6.svg" alt="char6" />
                            </div>
                        ) :
                            (<div className='profile_character_current'>
                                <img src={profileImageSelector} />
                                <div className='icon_edit'>
                                    <span onClick={() => setProfile(true)} class="material-symbols-outlined"
                                        id='profile_editBtn'>edit</span>
                                </div>
                            </div>)}
                    </div>
                    <div className="profile_name" >
                        <div className='profile_userInfo'>NAME : <span>{nameSelector}</span></div>
                    </div >
                    <div className="profile_number">
                        <div className='profile_userInfo'>NUMBER : <span>{numberSelector}</span></div>
                    </div>
                    <div className="profile_id">
                        <div className='profile_userInfo'>ID : <span>{idSelector}</span></div>
                    </div>

                </Profile>



                <button className='profile_edit_btn' onClick={() => setShow(true)}>프로필 수정</button>
                <div className='back_btn' id='profile_passwordConfirm_back' s onClick={() => navigate("/main")}>
                    <span className='material-symbols-outlined'></span>
                </div>
            </Contents>

        </Container >))


};

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

const Profile = styled.div`
display: flex;
flex-direction: column;
background-color: #e8f0fe;
border-radius: 10px;
padding: 20px;
align-items: center;`
const TextInput = styled.input``

const Label = styled.label``



export default ProfilePage
