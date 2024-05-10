import axios from '../axios'

export const getListSeat = async(id) => await axios({
    url: 'seat/list-seat',
    params: {idRoom: id},
    method: 'get'
})