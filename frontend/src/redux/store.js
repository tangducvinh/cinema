import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./slides/appSlice";
import userReducer from "./slides/userSlide";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import showReducer from "./slides/showSlide";
const userConfig = {
  key: "user",
  storage,
  whitelist: ["currentUser"],
};

export const store = configureStore({
  reducer: {
    app: appSlice,
    user: persistReducer(userConfig, userReducer),
    show: showReducer,
  },
});

export const persist = persistStore(store);
