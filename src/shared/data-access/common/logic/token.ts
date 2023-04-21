import axiosApi from '../configs/axiosApi';

export function setToken(token: string | null) {
  if (token) {
    axiosApi.defaults.headers.common['Authorization'] = `Token ${token}`;
  } else {
    delete axiosApi.defaults.headers.common['Authorization'];
  }
}
