import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getCurrentUser } from 'shared/data-access/auth/authSlice';
import {
  ApiStatus,
  GenericErrorModel,
  LoginUser
} from 'shared/data-access/common/configs/appModels';
import { RootState } from 'shared/data-access/common/configs/store';
import api from './loginApi';

interface LoginState {
  errors: Record<string, string[]>;
  status: ApiStatus;
}

const initialState: LoginState = {
  errors: {},
  status: 'idle'
};

export const login = createAsyncThunk(
  'login',
  async (user: LoginUser, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.login(user);
      dispatch(getCurrentUser());
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    resetError: (state) => {
      state.errors = {};
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.errors = {};
        state.status = 'loading';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.errors = {};
        state.status = 'success';
      })
      .addCase(login.rejected, (state, action) => {
        state.errors = (action.payload as GenericErrorModel).errors;
        state.status = 'error';
      });
  }
});

export const loginActions = loginSlice.actions;

export const selectLoginErrors = (state: RootState) => state.login.errors;
export const selectLoginStatus = (state: RootState) => state.login.status;

const loginReducer = loginSlice.reducer;
export default loginReducer;
