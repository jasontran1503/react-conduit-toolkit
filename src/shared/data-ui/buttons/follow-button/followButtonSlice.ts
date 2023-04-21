import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { articleActions } from 'article/articleSlice';
import { profileActions } from 'profile/profileSlice';
import api from './followButtonApi';

export interface FollowButtonState {}

export const toggleFollow = createAsyncThunk(
  'toggleFollow',
  async (
    { following, username }: { following: boolean; username: string },
    { dispatch, rejectWithValue }
  ) => {
    try {
      const response = await api.toggleFollow(following, username);
      dispatch(profileActions.toggleFollow(response));
      dispatch(articleActions.toggleFollow(response));
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const followButtonSlice = createSlice({
  name: 'followButton',
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(toggleFollow.pending, (state) => {
        // state.user = null;
      })
      .addCase(toggleFollow.fulfilled, (state, action) => {
        // state.user = action.payload;
      })
      .addCase(toggleFollow.rejected, (state, action) => {
        // state.user = null;
      });
  }
});
