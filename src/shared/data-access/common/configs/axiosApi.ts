import axios, { AxiosResponse } from 'axios';
import { history } from '../logic/history';

const axiosApi = axios.create({
  baseURL: 'https://api.realworld.io/api/',
  headers: {
    'Content-Type': 'application/json'
  }
});

axiosApi.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    switch (error.response.status) {
      case 401:
        history.navigate('/login');
        break;
      case 404:
        history.navigate('/404');
        break;
    }
    return Promise.reject(error.response.data);
  }
);

export default axiosApi;
