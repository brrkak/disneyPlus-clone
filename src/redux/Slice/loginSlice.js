import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    userInfo: [],
    id: '',
    pw: '',
    name: '',
    number: '',
    isAuthenticated: false,
}

const loginSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (state, action) => {
            const { id, pw } = action.payload;
            const userInfo = state.userInfo;
            const user = userInfo.find(user => user.id === id && user.pw === pw)
            if (user) {
                state.id = user.id;
                state.pw = user.pw;
                state.isAuthenticated = true;
            } else {
                state.isAuthenticated = false;
                alert("비밀번호 또는 아이디가 틀립니다.")
                window.location.reload()
            }
        },
        logout: (state) => {
            state.name = ''
            state.number = ''
            state.id = ''
            state.pw = ''
            state.isAuthenticated = false
        },
        userSearch: (state, action) => {
            state.name = action.payload;
            state.number = action.payload;
        },
        addUserInfo: (state, action) => {
            const { name, pw, id, number } = action.payload;
            const existingUser = state.userInfo.find(user => user.id === id);

            if (existingUser) {
                alert(`이미 사용중인 아이디입니다.`)
                window.location.reload()
            } else {
                state.userInfo = [...state.userInfo, { name, number, id, pw }]
                alert("회원가입 완료!")
            }
        },
    },
},
)


export default loginSlice.reducer;
export const { login, logout, addUserInfo } = loginSlice.actions;