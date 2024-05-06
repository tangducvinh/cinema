import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  children: null,
};

export const appSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setChidlren: (state, action) => {
      state.children = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setChidlren } = appSlice.actions;

export default appSlice.reducer;
