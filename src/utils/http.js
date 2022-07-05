import axios from 'axios';
import { ElMessage } from 'element-plus';
import { getApiBaseUrl } from '../configs/env';

const defaultConfig = {
  timeout: 8000,
  baseURL: getApiBaseUrl(),
};

const http = axios.create(defaultConfig);

// 响应拦截器
http.interceptors.response.use(
  (response) => {
    if (response?.data?.code === 200) {
      // code === 0，表示请求正常, 封装原有结构返回
      return response.data;
    }

    // code !== 0，表示请求有错误,获取 msg，返回reject
    const errMsg = response?.data?.msg;
    if (errMsg) {
      ElMessage({
        message: errMsg,
        type: 'error',
        duration: 1500,
      });
    }

    return Promise.reject(response);
  },

  (error) => {
    let errMsg = '';
    if (error?.response?.status === 401) {
      errMsg = '无权限访问';
    } else {
      errMsg = error.message;
    }

    console.log('err', error);
    if (errMsg) {
      ElMessage({
        message: errMsg,
        type: 'error',
        duration: 1500,
      });
    }

    return Promise.reject(error);
  },
);

export default http;
