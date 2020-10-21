/**
 * @file:      axios 配置文件
 * @author:    花夏(liubiao@itoxs.com)
 * @version:   V1.0.1
 * @date:      2020/8/24 上午11:26:54
 */
import axios from 'axios';
import { Message } from 'view-design';
import ignoreLogin from './ignore-login';
import resolveUrl from './resolveUrl';
import exportUrl from './exportUrl';
import store from '../store';
const instance = axios.create();
// axios配置
instance.defaults.timeout = 5000;
instance.defaults.headers = {
    'x-requested-with': 'XMLHttpRequest',
    'content-type': 'application/json; charset=utf-8'
};
instance.defaults.transformResponse = [
    data => {
        let datas = typeof data === 'string' ? JSON.parse(data) : data;
        return datas;
    }
];

// 添加请求拦截器
instance.interceptors.request.use(
    config => {
        let url = config.url;
        const TOKEN = localStorage.token || '';
        if (TOKEN) {
            config.headers.Authorization = TOKEN;
        } else {
            // includes() 方法用于判断字符串是否包含指定的子字符串。
            config.headers.Authorization = url.includes('/auth/token')
                ? 'Basic cGlnOnBpZw=='
                : localStorage.token || '123';
        }
        // 如果不含忽略的url
        if (!ignoreLogin.includes(url) && !TOKEN) {
            Message.error({
                content: '未登录请登录',
                onClose() {
                    self.location.href = `${location.origin}` + '/#/login';
                }
            });
            return Promise.reject('未登录请登录');
        }
        // 导出接口
        if (exportUrl.includes(config.url)) {
            config.headers['Content-Type'] = 'application/excel';
            config.responseType = 'arraybuffer';
        }
        if (process.env.VUE_APP_MOCK === undefined) {
            config.url = `${process.env.VUE_APP_ORIGIN}${url}`;
        }
        return config;
    },
    error => {
        Message.error('请求超时!');
        return Promise.reject(error);
    }
);

// 添加响应拦截器
instance.interceptors.response.use(
    response => {
        // 直接resolve
        let url = response.config.url.split(`${process.env.VUE_APP_ORIGIN}`);
        url = url.length > 1 ? url[1] : url[0];
        if (resolveUrl.includes(url)) {
            return Promise.resolve(response.data);
        }
        if (
            response.status
            &&response.status === 200
            &&response.data.code === 'error'
        ) {
            Message.error(response.data.msg);
            return Promise.reject(response.data);
        } else if (response.status === 200 || response.status === 304) {
            if (+response.data.code === 0 || +response.data.code === 1) {
                // 后端请求发送成功
                return Promise.resolve(response.data);
            }
            Message.error(response.data.msg);
            return Promise.reject(response.data);
        }
        return Promise.reject(response);
    },
    error => {
        const res = error.response;
        if (res && (res.status === 504 || res.status === 404)) {
            Message.error('服务器被吃了⊙﹏⊙∥');
        } else if (res && res.status === 503) {
            Message.error('服务器维护');
        } else if (res && res.status === 403) {
            Message.error('权限不足,请联系管理员!');
        } else if (res && res.status === 426) {
            Message.error(res.data.msg);
        } else if (res.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('userInfo');
            store.commit('SET_USERSINFO', '');
            Message.error({
                content: '登录已失效，请重新登录',
                onClose() {
                    self.location.href = `${location.origin}/#/login`;
                }
            });
        } else {
            Message.error(res ? res.data.msg || '未知错误!' : '未知错误!');
        }
        // 返回接口返回的错误信息
        return Promise.reject(res.data);
    }
);

export default instance;
