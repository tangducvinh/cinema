import axios from '../axios'

export const getAllShow = async(day) => axios({
    url: 'show/all',
    params: day,
    method: 'get',
})

export const deleteShow = async(sid) => axios({
    url: 'show/' + sid,
    method: 'delete'
})