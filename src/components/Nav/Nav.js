import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { memoLoginAuthSelector, memoLogoutSelector, memoProfileImageSelector } from "../../redux/Selector/memoSelectors";
import { logout } from "../../redux/Slice/loginSlice";
import "./Nav.css"

const Nav = () => {
  const authSelector = useSelector(memoLoginAuthSelector);
  const logoutSelector = useSelector(memoLogoutSelector);
  const profileImageSelector = useSelector(memoProfileImageSelector)
  const [profile, setProfile] = useState(false);
  const [show, setShow] = useState(false);
  // 창전환
  const { pathname } = useLocation();
  //  useLocation을 통한 현재 경로나타내기
  const [searchValue, setSearchValue] = useState("");
  //  검색
  const navigate = useNavigate();
  // useNavigate를 이용한 경로찾기
  const dispatch = useDispatch();

  // 프로필 사진 
  const profileImage = () => {
    return <img className="main_profile_character" alt="프로필사진" src={profileImageSelector} />
  }

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        setShow(true);
      } else {
        setShow(false);
      }
    });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


  const handleScroll = () => {
    if (window.scrollY > 50) {
      setShow(true);
    } else {
      setShow(false);
    }
  };

  const handleChange = (e) => {
    setSearchValue(e.target.value);
    navigate(`/search?q=${e.target.value}`);
  };

  const toggleLogout = () => {
    dispatch(logout(logoutSelector))
    console.log(logoutSelector);
  }


  return (
    <Container>
      <NavWrapper show={show ? show : undefined}>
        <Logo>
          <img
            src="/images/logo.svg"
            alt="Disney Plus App"

            onClick={() => (window.location.href = "/")}
          />
        </Logo>
        {authSelector ? (
          <div className="main_nav">
            <Input
              value={searchValue}
              onChange={handleChange}
              className="main_search"
              type="text"
              placeholder="검색해주세요" />
            <div className="main_profile" onClick={() => navigate("/profile")}>
              {profileImage()}
            </div>
          </div>

        ) : (
          null
        )}
        <div className="main_login_btn">{authSelector ?
          <Login onClick={toggleLogout}>Logout</Login> :
          <Login onClick={() => navigate("/login")}>Login</Login>} </div>
      </NavWrapper>

    </Container>
  )
};

export default Nav;

const Container = styled.div``


const Login = styled.a`
  background-color: rgba(0, 0, 0, 0.6);
  padding: 8px 16px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  border: 1px solid #f9f9f9;
  border-radius: 4px;
  transition: all 0.2s ease 0s;
  &:hover {
    background-color: #f9f9f9;
    color: #000;
    border-color: transparent;
  }
`;

const Input = styled.input`
  position: fixed;
  left: 50%;
  transform: translate(-50%, 0);
  background-color: rgba(0, 0, 0, 0.582);
  border-radius: 5px;
  color: white;
  margin-top: .5%;  
  padding: 10px;
  border: 1px solid lightgray;
`;

const NavWrapper = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  background-color: ${(props) => (props.show ? "#090b13" : "transparent")};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 36px;
  letter-spacing: 16px;
  z-index: 3;
`;

const Logo = styled.a`
  padding: 0;
  width: 80px;
  margin-top: 4px;
  max-height: 70px;
  font-size: 0;
  display: inline-block;

  img {
    display: block;
    width: 100%;
  }
`;

