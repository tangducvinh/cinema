import axios from '../axios'

export const getAllMoives = async(data) => await axios({
    url: 'movie/all',
    method: 'get',
    params: data,
})


