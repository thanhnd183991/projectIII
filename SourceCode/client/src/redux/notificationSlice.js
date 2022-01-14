import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notifications: [],
};

export const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    UPDATE_NOTIFICATION: (state, action) => {
      state.notifications.unshift(action.payload);
    },
    RE_ENTER: (state, action) => {
      state.notifications = action.payload;
    },
    CLICK_NOTIFICATION: (state, action) => {
      const { movieID } = action.payload;

      state.notifications.splice(
        state.notifications.findIndex((v) => v.movie._id === movieID),
        1
      );
    },
    DELETE_ALL_NOTIFICATION: (state, action) => {
      state.notifications = [];
    },
  },
});

export const {
  DELETE_ALL_NOTIFICATION,
  CLICK_NOTIFICATION,
  UPDATE_NOTIFICATION,
  RE_ENTER,
} = notificationSlice.actions;

export default notificationSlice.reducer;
