import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import LoginPage from "../../pages/LoginPage";
import { useDispatch } from "react-redux";
import { openModal } from "../../redux/Slice/modalSlice";

const Nav = () => {
  const [show, setShow] = useState(false);
  // 창전환
  const { pathname } = useLocation();
  //  useLocation을 통한 현재 경로나타내기
  const [searchValue, setSearchValue] = useState("");
  //  검색
  const navigate = useNavigate();
  // useNavigate를 이용한 경로찾기
  const dispatch = useDispatch()


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

  // console.log(`useLocation`, useLocation().search);

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

  const handleOpenLoginModal = () => {
    dispatch(
      openModal({
        modalType: "LoginModal",
        isOpen: true,
      })
    )
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
        {pathname === "/" ? (
          <Login onClick={handleOpenLoginModal}>Login</Login>
        ) : (
          <Input
            value={searchValue}
            onChange={handleChange}
            className="nav__input"
            type="text"
            placeholder="검색해주세요"
          ></Input>
        )}
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
  padding: 5px;
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
