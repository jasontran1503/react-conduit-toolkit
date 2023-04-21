import { User, UserResponse } from '../common/configs/appModels';
import axiosApi from '../common/configs/axiosApi';

const getCurrentUser = async () => {
  const response = await axiosApi.get<UserResponse>('user');
  setUser(response.data.user);
  return response.data.user;
};

const setUser = (user: User | null) => {
  if (user && !user.image) {
    user.image = 'https://api.realworld.io/images/smiley-cyrus.jpeg';
  }
};

const authApi = { getCurrentUser };

export default authApi;
