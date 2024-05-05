import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slides/counterSlide";
import appSlice from './slides/appSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    app: appSlice,
  },
});
