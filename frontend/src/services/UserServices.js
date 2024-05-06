import axios from "axios";

export const axiosJWT = axios.create();

export const signInUser = async (data) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_URl}/user/login`,
    data
  );
  return res.data;
};

export const signUpUser = async (data) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_URl}/user/register`,
    data
  );
  return res.data;
};
