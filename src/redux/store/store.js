import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "../slice/account";
import expertReducer from "../slice/expert";

const store = configureStore({
  reducer: {
    account: accountReducer,
    expert: expertReducer,
  },
});
export default store;
