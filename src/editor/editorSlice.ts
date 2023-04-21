import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  ApiStatus,
  Article,
  GenericErrorModel,
  NewArticle,
  UpdateArticle
} from 'shared/data-access/common/configs/appModels';
import { RootState } from 'shared/data-access/common/configs/store';
import api from './editorApi';

export interface EditorState {
  article: Article | null;
  status: ApiStatus;
  errors: Record<string, string[]>;
}

const initialState: EditorState = {
  article: null,
  status: 'idle',
  errors: {}
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

export const createArticle = createAsyncThunk(
  'createArticle',
  async (article: NewArticle, { rejectWithValue }) => {
    try {
      const response = await api.createArticle(article);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateArticle = createAsyncThunk(
  'updateArticle',
  async ({ slug, article }: { slug: string; article: UpdateArticle }, { rejectWithValue }) => {
    try {
      const response = await api.updateArticle(slug, article);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getArticleBySlug.pending, (state) => {
        state.article = null;
        state.status = 'loading';
      })
      .addCase(getArticleBySlug.fulfilled, (state, action) => {
        state.article = action.payload;
        state.status = 'success';
      })
      .addCase(getArticleBySlug.rejected, (state, action) => {
        state.article = null;
        state.status = 'error';
      })

      .addCase(createArticle.pending, (state) => {
        state.status = 'loading';
        state.errors = {};
      })
      .addCase(createArticle.fulfilled, (state, action) => {
        state.status = 'success';
        state.errors = {};
      })
      .addCase(createArticle.rejected, (state, action) => {
        state.status = 'error';
        state.errors = (action.payload as GenericErrorModel).errors;
      })

      .addCase(updateArticle.pending, (state) => {
        state.status = 'loading';
        state.errors = {};
      })
      .addCase(updateArticle.fulfilled, (state, action) => {
        state.status = 'success';
        state.errors = {};
      })
      .addCase(updateArticle.rejected, (state, action) => {
        state.status = 'error';
        state.errors = (action.payload as GenericErrorModel).errors;
      });
  }
});

export const selectEditorArticleBySlug = (state: RootState) => state.editor.article;
export const selectEditorErrors = (state: RootState) => state.editor.errors;
export const selectEditorStatus = (state: RootState) => state.editor.status;

const editorReducer = editorSlice.reducer;
export default editorReducer;
