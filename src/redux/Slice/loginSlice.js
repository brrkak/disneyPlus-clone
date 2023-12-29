import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const BASE_URL = 'http://localhost:3000'

export const getPosts = createAsyncThunk(
    "GET/ALL/POSTS",
    async (payload, thunkAPI) => {
        try {
            const { data } = await axios.get(`${BASE_URL}/posts`);
            return thunkAPI.fulfillWithValue(data);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const addPosts = createAsyncThunk(
    "POST_Posts",
    async (payload, thunkAPI) => {
        try {
            const { data } = await axios.post(`${BASE_URL}/posts`, payload);
            console.log("data", data);
            return thunkAPI.fulfillWithValue(data);
        } catch (errer) {
            return thunkAPI.rejectWithValue(errer);
        }
    }
);

export const updatePosts = createAsyncThunk(
    "UPDATAE_Posts",
    async (payload, thunkAPI) => {
        try {
            console.log(payload);
            const { data } = await axios.put(
                `${BASE_URL}/posts/${payload.id}`,
                payload
            );
            console.log("data", DataTransfer);
            return thunkAPI.fulfillWithValue(data.data);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const deletePosts = createAsyncThunk(
    "DELETE_posts",
    async (payload, thunkAPI) => {
        try {
            await axios.delete(`${BASE_URL}/posts/${payload}`);
            return thunkAPI.fulfillWithValue(payload);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

const initialState = {
    userInfo: [],
    id: '',
    pw: '',
    name: '',
    number: '',
    isAuthenticated: false,
    error: null,
    isLoading: false,
}



const loginSlice = createSlice({

    name: "user",
    initialState,
    reducers: {
        login: (state, action) => {
            const { id, pw, number, name, isAuthenticated } = action.payload;
            const userInfo = state.userInfo;
            const user = userInfo.find(user => (user.id === id && user.pw === pw) || user.name === name || user.number === number)

            if (user) {
                state.id = user.id;
                state.pw = user.pw;
                state.name = user.name
                state.number = user.number
                state.isAuthenticated = isAuthenticated
            } else {
                alert("비밀번호 또는 아이디가 틀립니다.")
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
        auth: (state, action) => {
            state.isAuthenticated = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getPosts.pending, (state, action) => {
            state.isLoading = true;
            // state.error = null;
        });
        builder.addCase(addPosts.pending, (state, action) => {
            state.isLoading = true;
            state.isAuthenticated = action.payload;
        });
        builder.addCase(deletePosts.rejected, (state, action) => {
            state.isAuthenticated = false;
            state.isLoading = true;
        });
        /* Fulfilled */
        builder.addCase(getPosts.fulfilled, (state, action) => {
            state.isLoading = false;
            // console.log(action)
            state.posts = [...action.payload];
        }),
            builder.addCase(addPosts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.posts.push(action.payload);
            }),
            builder.addCase(updatePosts.fulfilled, (state, action) => {
                state.isLoading = false;
                console.log(action)
                const newState = state.posts.map((item) =>
                    action.meta.arg.id === item.id
                        ? { ...item, content: action.meta.arg.content }
                        : item
                );
                state.posts = newState;
                return state;
            }),
            builder.addCase(deletePosts.fulfilled, (state, action) => {
                state.isLoading = false;
                const newState = state.posts.filter(
                    (item) => item.id !== action.meta.arg
                );
                state.posts = newState;
                return state;
            }),
            /* Rejected */
            builder.addCase(getPosts.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
    }
})






export default loginSlice.reducer;
export const { login, logout, addUserInfo, profile, auth } = loginSlice.actions;