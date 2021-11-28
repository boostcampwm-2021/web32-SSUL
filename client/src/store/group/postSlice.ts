import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../index';
import { Post } from '@types';

export interface PostState {
  posts: Post[];
  selectedPostId: number;
}

const initialState = { posts: [], selectedPostId: -1 };

export const detailSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    initPosts() {
      return initialState;
    },
    setPosts(state, { payload }) {
      return { ...state, posts: payload };
    },
    selectPost(state, { payload }) {
      return { ...state, selectedPostId: payload };
    },
  },
});

export const { initPosts, setPosts, selectPost } = detailSlice.actions;
export default detailSlice.reducer;
export const selectAllPosts = (state: RootState): Post[] => state.post.posts;
export const selectChoosenPost = (state: RootState): Post | void => {
  const { posts, selectedPostId } = state.post;
  const selectedPost = posts.find((post: Post) => post.id === selectedPostId);
  if (!selectedPost) return;
  return selectedPost as Post;
};
