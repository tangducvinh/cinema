import axios from "axios";

export const getListShow = async (movieId, day) => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_URl}/show/list?movieId=${movieId}&day=${day}`
  );
  return res.data;
};

export const getDetailShow = async (showId) => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_URl}/show/detail/${showId}`
  );
  return res.data;
};

export const updateBlockSeats = async (data) => {
  const res = await axios.put(
    `${process.env.REACT_APP_API_URl}/show/block-seat`,
    data
  );
  return res.data;
};
