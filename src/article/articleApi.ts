import { SingleArticleResponse } from 'shared/data-access/common/configs/appModels';
import axiosApi from 'shared/data-access/common/configs/axiosApi';

const getArticleBySlug = async (slug: string) => {
  const response = await axiosApi.get<SingleArticleResponse>(`articles/${slug}`);
  return response.data.article;
};

const deleteArticle = async (slug: string) => {
  const response = await axiosApi.delete(`articles/${slug}`);
  return response.data;
};

const api = { getArticleBySlug, deleteArticle };

export default api;
