import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const authAsync = createAsyncThunk(
    "GET/AUTH",
    async (_, thunkAPI) => {
        const currentState = thunkAPI.getState()
        console.log(currentState.isAuthenticated);
        return currentState.isAuthenticated;
    }
)

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

            state.name = action.payload;
            state.number = action.payload;
        },
        addUserInfo: (state, action) => {
            const { name, pw, id, number } = action.payload;
            const existingUser = state.userInfo.find(user => user.id === id);
            if (existingUser) {
                state.isAuthenticated = false
                alert(`이미 사용중인 아이디입니다.`)
                //  초기화면 전환
            } else {
                state.userInfo = [...state.userInfo, { name, number, id, pw }]
                alert("회원가입 완료! 다시 로그인해주세요")
                // 초기화면에서 다시 로그인하게 만들어야함. 
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(authAsync.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(authAsync.fulfilled, (state) => {
            state.isLoading = false;

        });
        builder.addCase(authAsync.rejected, (state, action) => {
            state.isLoading = true;
            state.isAuthenticated = false;
            state.error = action.error.message;
        });

    }
})



export default loginSlice.reducer;
export const { login, logout, addUserInfo, profile, auth } = loginSlice.actions;