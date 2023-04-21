import { ProfileResponse } from 'shared/data-access/common/configs/appModels';
import axiosApi from 'shared/data-access/common/configs/axiosApi';

const toggleFollow = async (following: boolean, username: string) => {
  let response;

  if (following) {
    response = await axiosApi.delete<ProfileResponse>(`profiles/${username}/follow`);
  } else {
    response = await axiosApi.post<ProfileResponse>(`profiles/${username}/follow`, {});
  }
  return response.data.profile;
};

const api = { toggleFollow };

export default api;
