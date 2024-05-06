import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./slides/appSlice";
import userReducer from "./slides/userSlide";
export const store = configureStore({
  reducer: {
    app: appSlice,
    user: userReducer,
  },
});
