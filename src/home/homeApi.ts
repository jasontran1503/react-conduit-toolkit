import { MultipleArticlesResponse } from 'shared/data-access/common/configs/appModels';
import axiosApi from 'shared/data-access/common/configs/axiosApi';

const getYourFeed = async () => {
  const response = await axiosApi.get<MultipleArticlesResponse>('articles/feed');
  return response.data.articles;
};

const getGlobalFeed = async () => {
  const response = await axiosApi.get<MultipleArticlesResponse>('articles');
  return response.data.articles;
};

const getArticlesByTag = async (tag: string) => {
  const response = await axiosApi.get<MultipleArticlesResponse>('articles', { params: { tag } });
  return response.data.articles;
};

const api = { getYourFeed, getGlobalFeed, getArticlesByTag };

export default api;
