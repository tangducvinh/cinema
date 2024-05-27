import { axios1 as axios} from '../axios'

export const register = async(data) => await axios({
    url: 'user/register',
    method: 'post',
    data
})

export const refreshToken = async() => await axios({
    url: 'user/refresh',
    method: 'post',
    withCredentials: true,
})

export const getAllUsers = async(data) => await axios({
    url: 'user/all',
    method: 'get',
    params: data,
})

export const updateUser = async(data, axiosJWT) => await axiosJWT({
    url: 'user',
    method: 'put',
    data
})

export const deleteUser = async(id, axiosJWT) => await axiosJWT({
    url: 'user/'+ id,
    method: 'delete',
})