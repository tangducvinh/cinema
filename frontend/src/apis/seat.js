import axios from '../axios'

export const createSeat = async(data) => await axios({
    url: 'seat/create',
    method: 'post',
    data
})
 
export const getListSeat = async(id) => await axios({
    url: 'seat/list-seat',
    params: {idRoom: id},
    method: 'get'
})

export const updateSeat = async(data) => await axios({
    url: 'seat',
    method: 'put',
    data
})