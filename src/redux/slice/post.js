import { createSlice } from "@reduxjs/toolkit";
const postStore = createSlice({
  name: "post",
  initialState: {
    listPost: [],
    postId: null,
    page: 0,
  },
  reducers: {
    setListPost: (state, action) => {
      return {
        ...state,
        listPost: action.payload,
      };
    },
    setPostId: (state, action) => {
      return {
        ...state,
        postId: action.payload,
      };
    },
    setPage: (state, action) => {
      return {
        ...state,
        page: action.payload,
      };
    },
  },
});

export const { setListPost, setPostId, setPage } = postStore.actions;
export default postStore.reducer;
