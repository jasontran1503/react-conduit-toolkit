import { LoginUser, UserResponse } from 'shared/data-access/common/configs/appModels';
import axiosApi from 'shared/data-access/common/configs/axiosApi';
import { setToken } from 'shared/data-access/common/logic/token';

const login = async (user: LoginUser) => {
  const response = await axiosApi.post<UserResponse>('users/login', { user });
  localStorage.setItem('api_token', response.data.user.token);
  setToken(response.data.user.token);
  return response.data.user;
};

const loginApi = { login };

export default loginApi;
