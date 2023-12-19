import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { closeModal, selectModal } from '../redux/Slice/modalSlice'
import LoginPage from '../pages/LoginPage'
import styled from 'styled-components'
import "./GlobalModal.css"
import SignUpPage from '../pages/SignUpPage'

const MODAL_COMPONENTS = [
    {
        type: "LoginModal",
        component: <LoginPage />
    },
    {
        type: "SignUpModal",
        component: <SignUpPage />
    }
]


function GlobalModal() {
    const { modalType, isOpen } = useSelector(selectModal);
    const dispatch = useDispatch();
    if (!isOpen) return;

    const findModal = MODAL_COMPONENTS.find((modal) => {
        return modal.type === modalType;
    })

    const renderModal = () => {
        return findModal.component;
    }

    return (
        <Container>
            <Overlay onClick={() => dispatch(closeModal())} />
            {renderModal()}
        </Container>
    )
}

const Container = styled.div`
position: fixed;
width: 500px;
height: 500px;
background-color: skyblue;
left: 200px;
right: 200px;
z-index: 1;`

const Overlay = styled.div`
position: relative;
left: 150px;
top: 250px;
width: 50px;
height: 50px;
background-color: black;
z-index: 1;`

export default GlobalModal;