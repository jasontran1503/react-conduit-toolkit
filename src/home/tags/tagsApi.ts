import { TagsResponse } from 'shared/data-access/common/configs/appModels';
import axiosApi from 'shared/data-access/common/configs/axiosApi';

const getTags = async () => {
  const response = await axiosApi.get<TagsResponse>('tags');
  return response.data.tags;
};

const api = { getTags };

export default api;
