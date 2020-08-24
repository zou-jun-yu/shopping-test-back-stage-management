import axios from "axios";
import { getToken } from "../utils/auth";

let cancel;
axios.interceptors.request.use(
  (config) => {
    config.headers["authorization"] = getToken();
    config.cancelToken = new axios.CancelToken((c) => {
      cancel = c;
    });
    return config;
  },
  (err) => Promise.reject(err)
);

axios.interceptors.response.use(
  (response) => {        cancel = null;
  return  response.data},
  error => {
    if (axios.isCancel(error)) {
      console.log('请求取消的错误', error.message)
      return new Promise(() => {})
    } else { 
      cancel = null
      return Promise.reject(error)
    }
  }
);
function cancelReq() {
  if (typeof cancel === 'function') {
    cancel('强制取消请求')
  } else {
    console.log('没有可取消的请求')
  }
}

export const post = (url, data) => axios.post(url, data);
export const get = (url, params) => axios.get(url, { params });
export const cancelRequest = cancelReq ; 

