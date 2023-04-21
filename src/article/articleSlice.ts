import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ApiStatus, Article, Profile } from 'shared/data-access/common/configs/appModels';
import { RootState } from 'shared/data-access/common/configs/store';
import api from './articleApi';

export interface ArticleState {
  data: Article | null;
  status: ApiStatus;
}

const initialState: ArticleState = {
  data: null,
  status: 'idle'
};

export const getArticleBySlug = createAsyncThunk(
  'getArticleBySlug',
  async (slug: string, { rejectWithValue }) => {
    try {
      const response = await api.getArticleBySlug(slug);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteArticle = createAsyncThunk(
  'deleteArticle',
  async (slug: string, { rejectWithValue }) => {
    try {
      const response = await api.deleteArticle(slug);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const articleSlice = createSlice({
  name: 'article',
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<Article>) => {
      if (state.data) {
        state.data = action.payload;
      }
    },
    toggleFollow: (state, action: PayloadAction<Profile>) => {
      if (state.data) {
        state.data.author = action.payload;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getArticleBySlug.pending, (state) => {
        state.data = null;
      })
      .addCase(getArticleBySlug.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(getArticleBySlug.rejected, (state, action) => {
        state.data = null;
      })

      .addCase(deleteArticle.pending, (state) => {})
      .addCase(deleteArticle.fulfilled, (state, action) => {
        state.data = null;
      })
      .addCase(deleteArticle.rejected, (state, action) => {});
  }
});

export const articleActions = articleSlice.actions;

export const selectArticleBySlug = (state: RootState) => state.article.data;

const articleReducer = articleSlice.reducer;
export default articleReducer;
