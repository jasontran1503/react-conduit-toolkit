import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ApiStatus, Article, Profile } from 'shared/data-access/common/configs/appModels';
import { RootState } from 'shared/data-access/common/configs/store';
import api from './profileApi';

export type ProfileArticlesType = 'author' | 'favorited';

export interface ProfileState {
  user: Profile | null;
  articles: Article[];
  status: ApiStatus;
}

const initialState: ProfileState = {
  user: null,
  articles: [],
  status: 'idle'
};

export const getProfile = createAsyncThunk(
  'getProfile',
  async (username: string, { rejectWithValue }) => {
    try {
      const response = await api.getProfile(username);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getProfileArticles = createAsyncThunk(
  'getProfileArticles',
  async (
    { articlesType, username }: { articlesType: string; username: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.getProfileArticles(articlesType, username);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    toggleFollow: (state, action: PayloadAction<Profile>) => {
      if (state.user) {
        state.user = action.payload;
      }
    },
    toggleFavorite: (state, action: PayloadAction<Article>) => {
      state.articles = state.articles.map((article) => {
        const { slug, favorited, favoritesCount } = action.payload;
        return article.slug === slug ? { ...article, favorited, favoritesCount } : article;
      });
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProfile.pending, (state) => {
        state.user = null;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.user = null;
      })

      .addCase(getProfileArticles.pending, (state) => {
        state.articles = [];
        state.status = 'loading';
      })
      .addCase(getProfileArticles.fulfilled, (state, action) => {
        state.articles = action.payload;
        state.status = 'success';
      })
      .addCase(getProfileArticles.rejected, (state, action) => {
        state.articles = [];
        state.status = 'error';
      });
  }
});

export const profileActions = profileSlice.actions;

export const selectProfile = (state: RootState) => state.profile.user;
export const selectProfileArticles = (state: RootState) => state.profile.articles;
export const selectProfileArticlesStatus = (state: RootState) => state.profile.status;

const profileReducer = profileSlice.reducer;
export default profileReducer;
