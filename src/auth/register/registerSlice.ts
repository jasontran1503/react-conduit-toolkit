import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getCurrentUser } from 'shared/data-access/auth/authSlice';
import { ApiStatus, GenericErrorModel, NewUser } from 'shared/data-access/common/configs/appModels';
import { RootState } from 'shared/data-access/common/configs/store';
import api from './registerApi';

interface RegisterState {
  errors: Record<string, string[]>;
  status: ApiStatus;
}

const initialState: RegisterState = {
  errors: {},
  status: 'idle'
};

export const register = createAsyncThunk(
  'register',
  async (user: NewUser, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.register(user);
      dispatch(getCurrentUser());
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    resetError: (state) => {
      state.errors = {};
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.errors = {};
        state.status = 'loading';
      })
      .addCase(register.fulfilled, (state, action) => {
        state.errors = {};
        state.status = 'success';
      })
      .addCase(register.rejected, (state, action) => {
        state.errors = (action.payload as GenericErrorModel).errors;
        state.status = 'error';
      });
  }
});

export const registerActions = registerSlice.actions;

export const selectRegisterErrors = (state: RootState) => state.register.errors;
export const selectRegisterStatus = (state: RootState) => state.register.status;

const registerReducer = registerSlice.reducer;
export default registerReducer;
