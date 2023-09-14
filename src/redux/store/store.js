import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "../slice/account";

const store = configureStore({
  reducer: {
    account: accountReducer,
  },
});
export default store;
