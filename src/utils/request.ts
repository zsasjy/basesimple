import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import { message } from 'antd';
import { IResponseType } from 'src/interface';

class Request {
    private instance: AxiosInstance;
    constructor() {
        this.instance = axios.create();
        this.instance.defaults.withCredentials = false;
    }
    request<T>(url: string, opt: AxiosRequestConfig): Promise<T> {
        return this.instance
            .request<IResponseType<T>>({ ...opt, url })
            .then(res => {
                if (!res.data || (res.data.status !== 'success' && res.data.status !== 0)) {
                    if (res.data && res.data.status === 1) {
                        message.error('登录状态已过期，请重新登录');
                        return Promise.reject('登录状态已过期，请重新登录');
                    }
                    const error = res.data
                        ? res.data.message || res.data.msg || '请求获取失败了，请稍后再试吧！'
                        : '请求获取失败了，请稍后再试吧！';
                    message.error(error);
                    return Promise.reject(error);
                }
                return Promise.resolve(res.data.data);
            })
            .catch((err: AxiosError) => {
                return Promise.reject(err.message);
            });
    }
    get<T>(url: string, params?: { [key: string]: any }): Promise<T> {
        return this.request(url, { method: 'get', params });
    }
    post<T>(url: string, data: { [key: string]: any }): Promise<T> {
        return this.request(url, { method: 'post', data });
    }
}

export default new Request();
