import axios from "axios";

export const getListShow = async (movieId, day) => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_URl}/show/list?movieId=${movieId}&day=${day}`
  );
  return res.data;
};
