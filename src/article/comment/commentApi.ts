import {
  MultipleCommentsResponse,
  NewComment,
  SingleCommentResponse
} from 'shared/data-access/common/configs/appModels';
import axiosApi from 'shared/data-access/common/configs/axiosApi';

const getComments = async (slug: string) => {
  const response = await axiosApi.get<MultipleCommentsResponse>(`articles/${slug}/comments`);
  return response.data.comments;
};

const createComment = async (slug: string, comment: NewComment) => {
  const response = await axiosApi.post<SingleCommentResponse>(`articles/${slug}/comments`, {
    comment
  });
  return response.data.comment;
};

const deleteComment = async (slug: string, id: number) => {
  const response = await axiosApi.delete(`articles/${slug}/comments/${id}`);
  return response.data;
};

const api = { getComments, createComment, deleteComment };

export default api;
