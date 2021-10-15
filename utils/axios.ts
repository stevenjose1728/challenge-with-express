import axios, {AxiosError, AxiosResponse ,AxiosInstance} from 'axios';
// import {store} from 'store'
const baseURL = process.env.NEXT_PUBLIC_API_URL;
let _axios: AxiosInstance = axios.create({
  baseURL,
});
_axios.interceptors.request.use(
  (config) => {
    // const { user } = store.getState();
    // if (user && user.token) {
    //   config.headers["Authorization"] = `Bearer ${user.token}`;
    // }

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