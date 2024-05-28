import { axios1 as axios } from '../axios'

export const createShow = async(data, axiosJWT) => await axiosJWT({
    url: 'show/create',
    data: data,
    method: 'post'
})

export const getListShow = async(data) => await axios({
    url: 'show/list',
    params: data,
    method: 'get',
})

export const getAllShow = async(day) => await axios({
    url: 'show/all',
    params: day,
    method: 'get',
})

export const updateShow = async(data, axiosJWT) => await axiosJWT({
    url: 'show',
    data,
    method: 'put'
})

export const deleteShow = async(sid, axiosJWT) => await axiosJWT({
    url: 'show/' + sid,
    method: 'delete'
})
