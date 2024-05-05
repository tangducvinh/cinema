import axios from "axios";

export const getDetailMovie = async (mid) => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_URl}/movie/infor/${mid}`
  );
  return res.data;
};
