import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import { configureStore } from "@reduxjs/toolkit"
import persistStore from "redux-persist/es/persistStore";
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer } from "redux-persist";
import modalSlice from "../../redux/Slice/modalSlice";
import loginSlice from "../Slice/loginSlice";
import { apiSlice } from "../../api/apiSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import authReducer from "../Slice/auth/authSlice"
const persistConfig = {
    key: "root",
    storage,
}

const rootReducer = combineReducers({
    // login: loginSlice,
})

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: {
        persistedReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat(apiSlice.middleware),
    devTools: process.env.NODE_ENV !== "production",
})

// setupListeners(store.dispatch)
export const persistor = persistStore(store);
export default store;   