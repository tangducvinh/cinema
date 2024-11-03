import axios from "axios";
import { axios1 } from "../axios";

export const axiosJWT = axios.create();

export const signInUser = async (data) => {
  // const res = await axios.post(
  //   `${process.env.REACT_APP_API_URl}/user/login`,
  //   data
  // );

  const res = await axios1.post(
    `${process.env.REACT_APP_API_URl}/user/login`,
    data
  );

  return res;
};

export const logoutUser = async (data) => {
  // const res = await axios.post(
  //   `${process.env.REACT_APP_API_URl}/user/login`,
  //   data
  // );

  const res = await axios1.post(`${process.env.REACT_APP_API_URl}/user/logout`);

  return res;
};

// export const signUpUser = async (data) => {
//   const res = await axios1.post(
//     `${process.env.REACT_APP_API_URl}/user/register`,
//     data
//   );
//   return res.data;
// };
