import { axios1 as axios} from '../axios'

export const getAllOrder = async(data) => await axios({
    url: 'order/allOrder',
    params: data,
    method: 'get'
})

export const getDataChart = async(type) => await axios({
    url: 'order/data-chart/' + type,
    method: 'get',
})