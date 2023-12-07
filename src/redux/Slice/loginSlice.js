import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = { value: { isAuthorized: false, userId: ``, username: ``, introduction: `` } }

const loginSlice = createSlice({
    name: "user",
    initialState: { value: initialStateValue },
    reducers: {
        login: (state, action) => {

        },
        logout: (state) => {

        },
        saveUserInfo: (state, action) => {

        }
    }
})


export default loginSlice.reducer;
export const { login, saveUserInfo, logout } = loginSlice.actions;