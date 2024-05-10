import axios from 'axios'

import jwt from 'jwt-decode'


const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URl
})

// Add a request interceptor
instance.interceptors.request.use(function(config) {
    // Do something before request is sent

    let dataLocalStorage = window.localStorage.getItem('persist:user')
    // console.log(dataLocalStorage)

    if (dataLocalStorage && typeof dataLocalStorage === 'string') {
      dataLocalStorage = JSON.parse(dataLocalStorage)
      if (dataLocalStorage.accessToken) {
        const token = JSON.parse(dataLocalStorage.accessToken)

        config.headers = `Bearer ${token}`
        return config
      }
    }

  return config
}, function (error) {
  // Do something with request error
  // return Promise.resolve(error.response.data);
  // console.log(error)
  return Promise.reject(error.response)
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    // return Promise.resolve(error.response.error);
    return Promise.resolve(error.response)

  });

export default instance