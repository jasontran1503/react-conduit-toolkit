import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ApiStatus, User } from 'shared/data-access/common/configs/appModels';
import { RootState } from '../common/configs/store';
import { setToken } from '../common/logic/token';
import authApi from './authApi';

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  status: ApiStatus;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  status: 'idle'
};

export const getCurrentUser = createAsyncThunk('getCurrentUser', async (_, { rejectWithValue }) => {
  const token = localStorage.getItem('api_token');
  if (token) {
    try {
      setToken(token);
      const response = await authApi.getCurrentUser();
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
  return null;
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    update: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      localStorage.removeItem('api_token');
      state.isAuthenticated = false;
      state.user = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCurrentUser.pending, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.status = 'loading';
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.status = 'success';
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.user = null;
        state.isAuthenticated = false;
        state.status = 'error';
      });
  }
});

export const authActions = authSlice.actions;

export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
export const selectAuthStatus = (state: RootState) => state.auth.status;

const authReducer = authSlice.reducer;
export default authReducer;
