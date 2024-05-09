import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  children: null,
  renderManagerMovie: false,
  renderManagerShow: false,
  renderManagerUser: false,
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
    },
    setRenderManagerUser: (state) => {
    
      state.renderManagerUser = !state.renderManagerUser
    }
  },
});

// Action creators are generated for each case reducer function
export const { setChidlren, setRenderManagerMovie, setRenderManagerShow, setRenderManagerUser } = appSlice.actions;

export default appSlice.reducer;
