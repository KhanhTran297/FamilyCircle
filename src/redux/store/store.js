import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "../slice/account";
import expertReducer from "../slice/expert";
import postReducer from "../slice/post";
import reactReducer from "../slice/react";
import searchReducer from "../slice/search";

const store = configureStore({
  reducer: {
    account: accountReducer,
    expert: expertReducer,
    post: postReducer,
    react: reactReducer,
    search: searchReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
export default store;
