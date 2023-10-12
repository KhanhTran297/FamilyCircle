import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "../slice/account";
import expertReducer from "../slice/expert";
import postReducer from "../slice/post";
const store = configureStore({
  reducer: {
    account: accountReducer,
    expert: expertReducer,
    post: postReducer,
  },
});
export default store;
