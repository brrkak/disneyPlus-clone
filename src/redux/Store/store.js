import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import { configureStore } from "@reduxjs/toolkit"
import persistStore from "redux-persist/es/persistStore";
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer } from "redux-persist";
import loginSlice from "../Slice/loginSlice";
import profileImage from "../Slice/profileImage";
import { userApi } from "../Service/createApi";

const persistConfig = {
    key: "root",
    storage,
}

const rootReducer = combineReducers({
    login: loginSlice,
    profile: profileImage,
})

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: {
        persistedReducer,
        [userApi.reducerPath]: userApi.reducer,
    },
    devTools: process.env.NODE_ENV !== "production",

    middleware: (getDefaultMiddleware) =>

        getDefaultMiddleware().concat(userApi.middleware)
})

export const persistor = persistStore(store);
export default store;