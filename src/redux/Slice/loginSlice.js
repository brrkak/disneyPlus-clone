import { createSlice } from "@reduxjs/toolkit";




const initialState = {
    userInfo: [],
    id: '',
    pw: '',
    name: '',
    number: '',
    isLoading: false,
    isAuthenticated: false,
    error: null,
}




const loginSlice = createSlice({

    name: "user",
    initialState,
    reducers: {
        login: (state, action) => {
            const { id, pw, number, name } = action.payload;
            const userInfo = state.userInfo;
            const user = userInfo.find(user => (user.id === id && user.pw === pw) || user.name === name || user.number === number)

            if (user) {
                state.id = user.id;
                state.pw = user.pw;
                state.name = user.name
                state.number = user.number
                state.isAuthenticated = true
            } else {
                alert("비밀번호 또는 아이디가 틀립니다.")
                state.isAuthenticated = false
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
            const { name, number } = action.payload;
            const userInfo = state.userInfo;
            const userSearch = userInfo.find(user => (user.name === name && user.number === number))

            if (userSearch) {
                state.name = userSearch.name;
                state.number = userSearch.number;
                state.error = null;
            } else {
                state.error = true;
            }

        },
        addUserInfo: (state, action) => {
            const { name, pw, id, number } = action.payload;
            const existingUser = state.userInfo.find(user => user.id === id);

            if (existingUser) {
                state.isAuthenticated = false
                alert(`이미 사용중인 아이디입니다.`)
            } else {
                state.userInfo = [...state.userInfo, { name, number, id, pw }]
                alert("회원가입 완료! 다시 로그인해주세요")
            }
        },
        delUserInfo: (state, action) => {
            const { pw, number } = action.payload
            const userInfo = state.userInfo;
            const userIndex = userInfo.findIndex(user => user.pw === pw || user.number === number)
            console.log(userIndex);
            if (userIndex !== -1) {
                state.userInfo.splice(userIndex, 1);
                state.isAuthenticated = false;
                alert("계정 삭제 완료!")
            } else {
                state.isAuthenticated = true;
            }
        },
        profileEdit: (state, action) => {
            const { name, pw } = action.payload
            const userInfo = state.userInfo;
            const userIndex = userInfo.findIndex(user => user.pw === pw)

            if (userIndex !== -1) {
                state.name = action.payload.name;
                state.userInfo[userIndex].name = name;
                state.error = null;
            } else {
                alert("비밀번호 또는 아이디가 틀립니다.")
                state.error = true;
            }
        },


    },

})



export default loginSlice.reducer;
export const { login, logout, addUserInfo, userSearch, profileEdit, delUserInfo } = loginSlice.actions;