import { createSlice } from "@reduxjs/toolkit";
import { login } from "./loginSlice";
const initialState = {
    id: '',
    pw: '',
    name: '',
    number: '',
}

const profileSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        profile: (state, action) => {
            const { id, pw, name, number } = action.payload;
            state.name = name
            state.number = number
            state.id = id
            state.pw = pw
        },
    },
    extraReducers: (builder) => {
        builder.addCase(login, (state, action) => {
            const { id, pw, name, number } = action.payload;
            return { ...state, id, pw, name, number }
        })
    },
}
)


export default profileSlice.reducer;
export const { profile } = profileSlice.actions;