import { NewUser, UserResponse } from 'shared/data-access/common/configs/appModels';
import axiosApi from 'shared/data-access/common/configs/axiosApi';
import { setToken } from 'shared/data-access/common/logic/token';

const register = async (user: NewUser) => {
  const response = await axiosApi.post<UserResponse>('users', { user });
  localStorage.setItem('api_token', response.data.user.token);
  setToken(response.data.user.token);
  return response.data.user;
};

const api = { register };

export default api;
