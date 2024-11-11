import axios from "axios";

export const getCreateURLPayment = async (data) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_URl}/payment/vnp`,
    data
  );
  return res.data;
};
