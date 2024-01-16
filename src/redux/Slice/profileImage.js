import { createSlice } from "@reduxjs/toolkit";



const initialState = {
    upload: "",
}



const loginSlice = createSlice({

    name: "profile",
    initialState,
    reducers: {
        upload: (state, action) => {
            state.upload = action.payload
        }

    }
})



export default loginSlice.reducer;
export const { upload } = loginSlice.actions;