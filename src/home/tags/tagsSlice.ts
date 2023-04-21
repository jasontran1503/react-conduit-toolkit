import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ApiStatus } from 'shared/data-access/common/configs/appModels';
import { RootState } from 'shared/data-access/common/configs/store';
import api from './tagsApi';

export interface TagsState {
  items: string[];
  status: ApiStatus;
}

const initialState: TagsState = {
  items: [],
  status: 'idle'
};

export const getTags = createAsyncThunk('getTags', async (_, { rejectWithValue }) => {
  try {
    const response = await api.getTags();
    return response;
  } catch (error) {
    return rejectWithValue(error);
  }
});

const tagsSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTags.pending, (state) => {
        state.items = [];
        state.status = 'loading';
      })
      .addCase(getTags.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = 'success';
      })
      .addCase(getTags.rejected, (state, action) => {
        state.items = [];
        state.status = 'error';
      });
  }
});

export const selectTags = (state: RootState) => state.tags.items;
export const selectTagsStatus = (state: RootState) => state.tags.status;

const tagsReducer = tagsSlice.reducer;
export default tagsReducer;
