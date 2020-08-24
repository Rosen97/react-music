import axios, { AxiosResponse, AxiosRequestConfig } from "axios";

const HTTP = axios.create({
  baseURL: "http://47.98.159.95/m-api/",
  timeout: 3000,
});

// 请求拦截器
HTTP.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    config.headers = {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
HTTP.interceptors.response.use(
  (res: AxiosResponse) => {
    const data = res.data;
    if (data.code !== 200) {
      // 统一抛出异常
      console.error(`${res.config.url} 接口数据获取失败!`);
    } else {
      return res.data;
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default HTTP;
