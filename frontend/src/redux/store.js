import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./slides/appSlice";
import userReducer from "./slides/userSlide";
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist'

const userConfig = {
  key: 'user',
  storage,
  whitelist: ['currentUser']
}

export const store = configureStore({
  reducer: {
    app: appSlice,
    user: persistReducer(userConfig, userReducer),
  },
});

export const persist = persistStore(store)
