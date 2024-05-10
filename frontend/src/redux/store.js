import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./slides/appSlice";
import userReducer from "./slides/userSlide";
import showReducer from "./slides/showSlide";
export const store = configureStore({
  reducer: {
    app: appSlice,
    user: userReducer,
    show: showReducer,
  },
});
