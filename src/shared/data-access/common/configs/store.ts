import { Action, combineReducers, configureStore, ThunkAction } from '@reduxjs/toolkit';
import articleReducer from 'article/articleSlice';
import commentReducer from 'article/comment/commentSlice';
import loginReducer from 'auth/login/loginSlice';
import registerReducer from 'auth/register/registerSlice';
import editorReducer from 'editor/editorSlice';
import homeReducer from 'home/homeSlice';
import tagsReducer from 'home/tags/tagsSlice';
import profileReducer from 'profile/profileSlice';
import settingsReducer from 'settings/settingsSlice';
import authReducer from '../../auth/authSlice';

const rootReducer = combineReducers({
  login: loginReducer,
  register: registerReducer,
  auth: authReducer,
  tags: tagsReducer,
  home: homeReducer,
  profile: profileReducer,
  settings: settingsReducer,
  article: articleReducer,
  editor: editorReducer,
  comment: commentReducer
});

export const store = configureStore({
  reducer: rootReducer
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
