import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ApiStatus, Comment, NewComment } from 'shared/data-access/common/configs/appModels';
import { RootState } from 'shared/data-access/common/configs/store';
import api from './commentApi';

export interface CommentState {
  comments: Comment[];
  status: ApiStatus;
}

const initialState: CommentState = {
  comments: [],
  status: 'idle'
};

export const getComments = createAsyncThunk(
  'getComments',
  async (slug: string, { rejectWithValue }) => {
    try {
      const response = await api.getComments(slug);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const createComment = createAsyncThunk(
  'createComment',
  async ({ slug, comment }: { slug: string; comment: NewComment }, { rejectWithValue }) => {
    try {
      const response = await api.createComment(slug, comment);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteComment = createAsyncThunk(
  'deleteComment',
  async ({ slug, id }: { slug: string; id: number }, { rejectWithValue }) => {
    try {
      const response = await api.deleteComment(slug, id);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getComments.pending, (state) => {
        state.comments = [];
      })
      .addCase(getComments.fulfilled, (state, action) => {
        state.comments = action.payload;
      })
      .addCase(getComments.rejected, (state, action) => {
        state.comments = [];
      })

      .addCase(createComment.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.comments = [...state.comments, action.payload];
        state.status = 'success';
      })
      .addCase(createComment.rejected, (state, action) => {
        state.status = 'error';
      })

      .addCase(deleteComment.pending, (state) => {})
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.comments = state.comments.filter((comment) => comment.id !== action.meta.arg.id);
      })
      .addCase(deleteComment.rejected, (state, action) => {});
  }
});

export const commentActions = commentSlice.actions;

export const selectCommentsBySlug = (state: RootState) => state.comment.comments;
export const selectCommentsStatus = (state: RootState) => state.comment.status;

const commentReducer = commentSlice.reducer;
export default commentReducer;
