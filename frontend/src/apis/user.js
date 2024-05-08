import axios from '../axios'

export const getAllUsers = async(data) => await axios({
    url: 'user/all',
    method: 'get',
    params: data,
})