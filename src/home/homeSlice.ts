import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ApiStatus, Article } from 'shared/data-access/common/configs/appModels';
import { RootState } from 'shared/data-access/common/configs/store';
import api from './homeApi';

export type HomeArticlesType = 'feed' | 'global' | 'tag';

export interface HomeState {
  articles: Article[];
  status: ApiStatus;
}

const initialState: HomeState = {
  articles: [],
  status: 'idle'
};

export const getYourFeed = createAsyncThunk('getYourFeed', async (_, { rejectWithValue }) => {
  try {
    const response = await api.getYourFeed();
    return response;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const getGlobalFeed = createAsyncThunk('getGlobalFeed', async (_, { rejectWithValue }) => {
  try {
    const response = await api.getGlobalFeed();
    return response;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const getArticlesByTag = createAsyncThunk(
  'getArticlesByTag',
  async (tag: string, { rejectWithValue }) => {
    try {
      const response = await api.getArticlesByTag(tag);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<Article>) => {
      state.articles = state.articles.map((article) => {
        const { slug, favorited, favoritesCount } = action.payload;
        return article.slug === slug ? { ...article, favorited, favoritesCount } : article;
      });
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getYourFeed.pending, (state) => {
        state.articles = [];
        state.status = 'loading';
      })
      .addCase(getYourFeed.fulfilled, (state, action) => {
        state.articles = action.payload;
        state.status = 'success';
      })
      .addCase(getYourFeed.rejected, (state, action) => {
        state.articles = [];
        state.status = 'error';
      });

    builder
      .addCase(getGlobalFeed.pending, (state) => {
        state.articles = [];
        state.status = 'loading';
      })
      .addCase(getGlobalFeed.fulfilled, (state, action) => {
        state.articles = action.payload;
        state.status = 'success';
      })
      .addCase(getGlobalFeed.rejected, (state, action) => {
        state.articles = [];
        state.status = 'error';
      });

    builder
      .addCase(getArticlesByTag.pending, (state) => {
        state.articles = [];
        state.status = 'loading';
      })
      .addCase(getArticlesByTag.fulfilled, (state, action) => {
        state.articles = action.payload;
        state.status = 'success';
      })
      .addCase(getArticlesByTag.rejected, (state, action) => {
        state.articles = [];
        state.status = 'error';
      });
  }
});

export const homeActions = homeSlice.actions;

export const selectHomeArticles = (state: RootState) => state.home.articles;
export const selectArticlesStatus = (state: RootState) => state.home.status;

const homeReducer = homeSlice.reducer;
export default homeReducer;
