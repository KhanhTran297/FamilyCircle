import { createSlice } from "@reduxjs/toolkit";
const expertsStore = createSlice({
  name: "listExpert",
  initialState: {
    expert: [],
    listExpertAccounts: [],
  },
  reducers: {
    setExpert: (state, action) => {
      return {
        ...state,
        expert: action.payload,
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
export const { setExpert, setListExpertAccounts } = expertsStore.actions;
//Reducer
export default expertsStore.reducer;
