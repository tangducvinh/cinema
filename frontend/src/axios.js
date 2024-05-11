import axios from 'axios'

import jwt from 'jwt-decode'


const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URl
})

// Add a request interceptor
instance.interceptors.request.use(function(config) {
    // Do something before request is sent
    console.log('hello1')
    let dataLocalStorage = window.localStorage.getItem('persist:user')
    // console.log(dataLocalStorage)
    dataLocalStorage = JSON.parse(dataLocalStorage)

    if (dataLocalStorage?.currentUser !== 'null') {
      const token = JSON.parse(dataLocalStorage.currentUser).accessToken

      if (token) {
        console.log(token)
        config.headers['token'] = `Bearer ${token}`

        console.log('hello 4')
        return config
      }
      console.log('heelo 1')
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