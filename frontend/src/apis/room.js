import { axios1 as axios } from '../axios'

export const createRoom = async(data) => await axios({
    url: 'room/create',
    method: 'post',
    data
})

export const getListRoom = async() => await axios({
    url: 'room/list',
    method: 'get',
})