import { createSlice } from "@reduxjs/toolkit";
const expertStore = createSlice({
  name: "expert",
  initialState: {
    expert: [],
    listExpert: [],
  },
  reducers: {
    authLogin: () => {},
    authRegister: () => {},
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
  },
});
//Action
export const { authLogin, authRegister, setExpert, setListExpert } =
  expertStore.actions;
//Reducer
export default expertStore.reducer;
