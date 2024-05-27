import { axios1 as axios} from '../axios'

export const getAllMoives = async(data) => await axios({
    url: 'movie/all',
    method: 'get',
    params: data,
})

export const getMovieInfor = async(id) => await axios({
    url: 'movie/infor/' + id,
    method: 'get'
})

export const getListMovie = async(status) => await axios({
    url: 'movie/list/'+ status,
    method: 'get'
})

export const updateMovie = async(data, axiosJWT) => await axiosJWT({
    url: 'movie/update',
    method: 'put',
    data,
    withCredentials: true,
})

export const uploadImage = async(data) => await axios({
    url: 'movie/upload-image',
    method: 'put',
    data
})

export const createMovie = async(data, axiosJWT ) => await axiosJWT({
    url: 'movie/create',
    method: 'post',
    data,
    withCredentials: true,
})

export const deleteMovie = async(id, axiosJWT) => await axiosJWT({
    url: 'movie/' + id,
    method: 'delete',
    withCredentials: true,
})


