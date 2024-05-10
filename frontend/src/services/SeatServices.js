import axios from "axios";

export const getListSeat = async (idRoom) => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_URl}/seat/list-seat?idRoom=${idRoom}`
  );
  return res.data;
};
