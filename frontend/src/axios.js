import axios from 'axios'
import { Cookies } from 'react-cookie'

import { jwtDecode } from 'jwt-decode'
import * as apis from './apis'
import { updateUser } from './redux/slides/userSlide'
import swal from 'sweetalert'

import { logoutUser } from './services/UserServices'

export const axios1 = axios.create({
  baseURL: process.env.REACT_APP_API_URl
})

axios1.interceptors.response.use(function (response) {
  return response.data
}, function (error) {
  return Promise.resolve(error.response)

});

export const createInstance = ( dispatch, currentUser, navigate ) => {

  const axiosJWT = axios.create({
    baseURL: process.env.REACT_APP_API_URl
  })
  
  // Add a request interceptor
  axiosJWT.interceptors.request.use(async function(config) {
      // Do something before request is sent
      let dataLocalStorage = window.localStorage.getItem('persist:user')
      // console.log(dataLocalStorage)
      dataLocalStorage = JSON.parse(dataLocalStorage)
  
      if (dataLocalStorage?.currentUser !== 'null') {
        let token = JSON.parse(dataLocalStorage.currentUser).accessToken

        if (token) {
          let date = new Date()
          const decoded = await jwtDecode(token)
          
          if(decoded.exp < date.getTime() / 1000) {

            const response = await apis.refreshToken()

            if (response.accessToken) {
              token = response.accessToken

              const newDataUser = {...currentUser, accessToken: token}
              dispatch(updateUser(newDataUser))
            } else {
              await logoutUser()
              dispatch(updateUser(null))
              swal('Opps', 'Phiên đăng nhập đã hết hạn', 'warning')
              navigate('/')
              return
            }
          }
  
          config.headers['token'] = `Bearer ${token}`
          return config
        }
        return config
      } else {
        return config
      }
  
      // console.log('hello end')
    // return config
  }, function (error) {
    // Do something with request error
    // return Promise.resolve(error.response.data);
    // console.log(error)
    return Promise.reject(error.response)
  });
  
  // Add a response interceptor
  axiosJWT.interceptors.response.use(function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response.data
    }, function (error) {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      // return Promise.resolve(error.response.error);
      return Promise.resolve(error.response)
  
    });

  return axiosJWT
}

