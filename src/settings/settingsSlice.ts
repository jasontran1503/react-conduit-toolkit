import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { authActions } from 'shared/data-access/auth/authSlice';
import { ApiStatus, UpdateUser } from 'shared/data-access/common/configs/appModels';
import { RootState } from 'shared/data-access/common/configs/store';
import api from './settingsApi';

interface SettingsState {
  status: ApiStatus;
}

const initialState: SettingsState = {
  status: 'idle'
};

export const updateUser = createAsyncThunk(
  'updateUser',
  async (user: UpdateUser, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.updateUser(user);
      dispatch(authActions.update(response));
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.status = 'success';
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.status = 'error';
      });
  }
});

export const selectSettingsStatus = (state: RootState) => state.settings.status;

const settingsReducer = settingsSlice.reducer;
export default settingsReducer;
