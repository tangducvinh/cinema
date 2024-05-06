import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  children: null,
  renderManagerMovie: false,
};

export const appSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setChidlren: (state, action) => {
        state.children = action.payload
    },
    setRenderManagerMovie: (state) => {
    
      state.renderManagerMovie = !state.renderManagerMovie
    }
  },
});

// Action creators are generated for each case reducer function
export const { setChidlren, setRenderManagerMovie } = appSlice.actions;

export default appSlice.reducer;
