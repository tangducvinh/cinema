import axios from '../axios'

export const getAllUsers = async(data) => await axios({
    url: 'user/all',
    method: 'get',
    params: data,
})

export const updateUser = async(data) => await axios({
    url: 'user',
    method: 'put',
    data
})

export const deleteUser = async(id) => await axios({
    url: 'user/'+ id,
    method: 'delete',
})