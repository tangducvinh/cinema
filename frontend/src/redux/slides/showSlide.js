import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  begin_time: "",
  block_seats: [],
  createdAt: "",
  end_time: "",
  movieId: {},
  roomId: {},
  _id: "",
};

export const showSlide = createSlice({
  name: "Show",
  initialState,
  reducers: {
    updateShow: (state, action) => {
      const {
        begin_time,
        block_seats = [],
        createdAt,
        end_time,
        movieId = {},
        roomId = {},
        _id,
      } = action.payload;
      state.begin_time = begin_time;
      state.block_seats = block_seats;
      state.createdAt = createdAt;
      state.end_time = end_time;
      state.roomId = roomId;
      state.movieId = movieId;
      state._id = _id;
    },
    resetShow: (state, action) => {
      state.begin_time = "";
      state.block_seats = [];
      state.createdAt = "";
      state.end_time = "";
      state.roomId = {};
      state.movieId = {};
      state._id = "";
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateShow, resetShow } = showSlide.actions;

export default showSlide.reducer;
