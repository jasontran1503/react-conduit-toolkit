import {
  MultipleArticlesResponse,
  ProfileResponse
} from 'shared/data-access/common/configs/appModels';
import axiosApi from 'shared/data-access/common/configs/axiosApi';

const getProfile = async (username: string) => {
  const response = await axiosApi.get<ProfileResponse>(`profiles/${username}`);
  return response.data.profile;
};

const getProfileArticles = async (articlesType: string, username: string) => {
  const response = await axiosApi.get<MultipleArticlesResponse>(
    `articles?${articlesType}=${username}`
  );
  return response.data.articles;
};

const api = { getProfile, getProfileArticles };

export default api;
