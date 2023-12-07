import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    modalType: "",
    isOpen: false,
}


const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        openModal: (state, actions) => {
            const { modalType } = actions.payload;
            state.modalType = modalType;
            state.isOpen = true

        },
        closeModal: (state) => {
            state.isOpen = false
        }
    }
})


export default modalSlice.reducer;
export const selectModal = ((state) => state.persistedReducer.modal);
export const { openModal, closeModal } = modalSlice.actions;