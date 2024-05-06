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

export const uploadImage = async(data) => await axios({
    url: 'movie/upload-image',
    method: 'put',
    data
})

export const createMovie = async(data) => await axios({
    url: 'movie/create',
    method: 'post',
    data
})

export const deleteMovie = async(id) => await axios({
    url: 'movie/' + id,
    method: 'delete'
})


