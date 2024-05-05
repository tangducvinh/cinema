import axios from '../axios'

export const getAllMoives = async(data) => await axios({
    url: 'movie/all',
    method: 'get',
    params: data,
})

export const getMovieInfor = async(id) => await axios({
    url: 'movie/infor/' + id,
    method: 'get'
})

export const updateMovie = async(data) => await axios({
    url: 'movie/update',
    method: 'put',
    data
})


