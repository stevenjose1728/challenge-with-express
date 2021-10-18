import axios, {AxiosError, AxiosResponse ,AxiosInstance, AxiosRequestConfig} from 'axios';
import { emit } from "jetemit";
const baseURL = process.env.NEXT_PUBLIC_API_URL;
let _axios: AxiosInstance = axios.create({
  baseURL,
});

_axios.interceptors.request.use(
  (config: AxiosRequestConfig<{Authorization: string}>) => {
    const user = emit('GET-USER')?.[1]
    if (user?.token && config?.headers) {
      config.headers['Authorization'] = `Bearer ${user.token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

_axios.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  }
);
export default _axios;