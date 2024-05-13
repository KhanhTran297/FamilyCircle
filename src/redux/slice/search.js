import { createSlice } from "@reduxjs/toolkit";
const searchStore = createSlice({
  name: "searchParams",
  initialState: {
    searchParams: {},
    // listAccount: [],
  },

  reducers: {
    // authLogin: () => {},
    // authRegister: () => {},
    setSearchParamsRedux: (state, action) => {
      return {
        searchParams: action.payload,
      };
    },
    // setListAccount: (state, action) => {
    //   return {
    //     ...state,
    //     listAccount: action.payload,
    //   };
    // },
  },
});
//Action
export const { setSearchParamsRedux } = searchStore.actions;
//Reducer
export default searchStore.reducer;
