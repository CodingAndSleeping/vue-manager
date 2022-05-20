import axios from 'axios';
import config from '@/config/index';


const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro

class HttpRequest {
    constructor(baseUrl) {
        this.baseUrl = baseUrl
    }
    getInsideConfig() {
        const config = {
            baseUrl: this.baseUrl,
            header: {}
        };
        return config;
    }

    interceptors(instance) {
        instance.interceptors.request.use(config => config, error => Promise.reject(error));
        instance.interceptors.response.use(response => response, error => Promise.reject(error));
    }

    request(options) {
        const instance = axios.create();
        options = {
            ...this.getInsideConfig(),
            ...options
        };
        this.interceptors(instance)
        return instance(options)
    }
}



export default new HttpRequest(baseUrl)