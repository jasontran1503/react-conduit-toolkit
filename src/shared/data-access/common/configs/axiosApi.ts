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
      case 500:
        break;
    }
    return Promise.reject(error.response.data);
  }
);

export default axiosApi;
