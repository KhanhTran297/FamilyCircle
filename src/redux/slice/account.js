import { createSlice } from "@reduxjs/toolkit";
const accountStore = createSlice({
  name: "account",
  initialState: {
    account: [],
    listAccount: [],
  },
  reducers: {
    authLogin: () => {},
    authRegister: () => {},
    setUser: (state, action) => {
      return {
        ...state,
        account: action.payload,
      };
    },
    setListAccount: (state, action) => {
      return {
        ...state,
        listAccount: action.payload,
      };
    },
  },
});
//Action
export const { authLogin, authRegister, setUser, setListAccount } =
  accountStore.actions;
//Reducer
export default accountStore.reducer;
