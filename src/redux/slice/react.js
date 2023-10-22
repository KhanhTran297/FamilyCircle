import { createSlice } from "@reduxjs/toolkit";
const reactStore = createSlice({
  name: "react",
  initialState: {
    listReaction: [],
    postId: null,
  },
  reducers: {
    setListReaction: (state, action) => {
      return {
        ...state,
        listReaction: action.payload,
      };
    },
    setPostId: (state, action) => {
      return {
        ...state,
        postId: action.payload,
      };
    },
  },
});

export const { setListReaction, setPostId } = reactStore.actions;
export default reactStore.reducer;
