import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movieId: "",
  showId: "",
  roomId: "",
  seats: [],
};

export const orderSlide = createSlice({
  name: "Order",
  initialState,
  reducers: {
    updateOrder: (state, action) => {
      const { movieId, showId, roomId, seats = [] } = action.payload;
      state.movieId = movieId;
      state.showId = showId;
      state.roomId = roomId;
      state.seats.push(seats);
    },
    resetOrder: (state, action) => {
      state.movieId = "";
      state.showId = "";
      state.roomId = "";
      state.seats = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateOrder, resetOrder } = orderSlide.actions;

export default orderSlide.reducer;
