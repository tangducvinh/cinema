import axios from '../axios'

export const createShow = async(data) => await axios({
    url: 'show/create',
    data: data,
    method: 'post'
})

export const getAllShow = async(day) => await axios({
    url: 'show/all',
    params: day,
    method: 'get',
})

export const deleteShow = async(sid) => await axios({
    url: 'show/' + sid,
    method: 'delete'
})