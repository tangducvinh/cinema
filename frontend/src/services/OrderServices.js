import axios from "axios";

export const createOrder = async (data) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_URl}/order/create`,
    data
  );
  return res.data;
};

export const getDetailOrder = async (oid) => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_URl}/order/detail/${oid}`
  );
  return res.data;
};
