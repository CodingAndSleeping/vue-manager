import axios from './index';

export const getMenu = (param) => {
    return axios.request({
        url: '/permission/getMenu',
        method:'post',
        data:param
    })
};

export const getData = (param) => {
    return axios.request({
        url: '/home/getData',
        method:'post',
        data:param
    })
};

export const getUser = (params) => {
    return axios.request({
        url: '/user/getUser',
        method:'get',
        params
    })
};



