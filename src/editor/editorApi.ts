import articleApi from 'article/articleApi';
import {
  NewArticle,
  SingleArticleResponse,
  UpdateArticle
} from 'shared/data-access/common/configs/appModels';
import axiosApi from 'shared/data-access/common/configs/axiosApi';

const getArticleBySlug = async (slug: string) => {
  return articleApi.getArticleBySlug(slug);
};

const createArticle = async (article: NewArticle) => {
  const response = await axiosApi.post<SingleArticleResponse>(`articles`, { article });
  return response.data.article;
};

const updateArticle = async (slug: string, article: UpdateArticle) => {
  const response = await axiosApi.put<SingleArticleResponse>(`articles/${slug}`, { article });
  return response.data.article;
};

const api = { getArticleBySlug, createArticle, updateArticle };

export default api;
