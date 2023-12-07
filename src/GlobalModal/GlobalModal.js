import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { closeModal, selectModal } from '../redux/Slice/modalSlice'
import LoginPage from '../pages/LoginPage'
import styled from 'styled-components'

const MODAL_COMPONENTS = [
    {
        type: "LoginModal",
        component: <LoginPage />
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
width: 500px;
height: 500px;
background-color: skyblue;`

const Overlay = styled.div`
position: relative;
left: 50px;
top: 250px;
width: 50px;
height: 50px;
background-color: black;`

export default GlobalModal;