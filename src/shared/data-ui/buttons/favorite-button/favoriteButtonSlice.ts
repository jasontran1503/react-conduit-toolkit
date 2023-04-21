import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { articleActions } from 'article/articleSlice';
import { homeActions } from 'home/homeSlice';
import { profileActions } from 'profile/profileSlice';
import api from './favoriteButtonApi';

export interface FavoriteButtonState {}

export const toggleFavorite = createAsyncThunk(
  'toggleFavorite',
  async (
    { favorited, slug }: { favorited: boolean; slug: string },
    { dispatch, rejectWithValue }
  ) => {
    try {
      const response = await api.toggleFavorite(favorited, slug);
      dispatch(articleActions.toggleFavorite(response));
      dispatch(homeActions.toggleFavorite(response));
      dispatch(profileActions.toggleFavorite(response));
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const favoriteButtonSlice = createSlice({
  name: 'favoriteButton',
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(toggleFavorite.pending, (state) => {})
      .addCase(toggleFavorite.fulfilled, (state, action) => {})
      .addCase(toggleFavorite.rejected, (state, action) => {});
  }
});
