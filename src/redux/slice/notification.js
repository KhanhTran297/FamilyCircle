import { createSlice } from "@reduxjs/toolkit";
const notificationStore = createSlice({
  name: "notification",
  initialState: {
    listNotification: [],
    notificationId: null,
  },
  reducers: {
    setListNotification: (state, action) => {
      return {
        ...state,
        listNotification: action.payload,
      };
    },
    setNotificationId: (state, action) => {
      return {
        ...state,
        notificationId: action.payload,
      };
    },
  },
});

export const { setListNotification, setNotificationId} = notificationStore.actions;
export default notificationStore.reducer;
