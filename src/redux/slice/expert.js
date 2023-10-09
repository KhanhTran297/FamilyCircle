import { createSlice } from "@reduxjs/toolkit";

const expertStore = createSlice({
  name: "expert",
  initialState: {
    expert: [],
    listExpert: [],
    listExpertAccounts: [],
  },
  reducers: {
    setExpert: (state, action) => {
      return {
        ...state,
        expert: action.payload,
      };
    },

    setListExpert: (state, action) => {
      return {
        ...state,
        listExpert: action.payload,
      };
    },
    setListExpertAccounts: (state, action) => {
      return {
        ...state,
        listExpertAccounts: action.payload,
      };
    },
  },
});
//Action
export const { setExpert, setListExpertAccounts, setListExpert } =
  expertStore.actions;
//Reducer
export default expertStore.reducer;
