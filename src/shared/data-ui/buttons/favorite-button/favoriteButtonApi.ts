import { SingleArticleResponse } from 'shared/data-access/common/configs/appModels';
import axiosApi from 'shared/data-access/common/configs/axiosApi';

const toggleFavorite = async (favorited: boolean, slug: string) => {
  let response;

  if (favorited) {
    response = await axiosApi.delete<SingleArticleResponse>(`articles/${slug}/favorite`);
  } else {
    response = await axiosApi.post<SingleArticleResponse>(`articles/${slug}/favorite`, {});
  }
  return response.data.article;
};

const api = { toggleFavorite };

export default api;
