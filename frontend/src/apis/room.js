import axios from '../axios'

export const getListRoom = async() => await axios({
    url: 'room/list',
    method: 'get',
})