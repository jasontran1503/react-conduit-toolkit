import { UpdateUser, UserResponse } from 'shared/data-access/common/configs/appModels';
import axiosApi from 'shared/data-access/common/configs/axiosApi';

const updateUser = async (user: UpdateUser) => {
  const response = await axiosApi.put<UserResponse>('user', { user });
  return response.data.user;
};

const api = { updateUser };

export default api;
