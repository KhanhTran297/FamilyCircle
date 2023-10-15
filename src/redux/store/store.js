import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "../slice/account";
import expertReducer from "../slice/expert";
import postReducer from "../slice/post";
import reactReducer from "../slice/react";
const store = configureStore({
  reducer: {
    account: accountReducer,
    expert: expertReducer,
    post: postReducer,
    react: reactReducer,
  },
});
export default store;
