import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  children: null,
  renderManagerMovie: false,
  renderManagerShow: false,
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
    },
    setRenderManagerShow: (state) => {
    
      state.renderManagerShow = !state.renderManagerShow
    }
  },
});

// Action creators are generated for each case reducer function
export const { setChidlren, setRenderManagerMovie, setRenderManagerShow } = appSlice.actions;

export default appSlice.reducer;
