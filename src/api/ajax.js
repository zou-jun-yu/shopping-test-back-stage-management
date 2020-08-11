import axios from "axios";
import { getToken } from "../utils/auth";

const instance = axios.create({
  timeout: 5000,
});

instance.interceptors.request.use(
  (config) => {
    config.headers["authorization"] = getToken();
    return config;
  },
  (err) => Promise.reject(err)
);

instance.interceptors.response.use(
  (response) => response.data,
  (err) => Promise.reject(err)
);

export const post = (url, data) => instance.post(url, data);
export const get = (url, params) => instance.get(url, { params });


