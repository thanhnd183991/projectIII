import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import homeReducer from "./homeSlice";
import searchReducer from "./searchSlice";
import detailReducer from "./detailSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    home: homeReducer,
    search: searchReducer,
    detail: detailReducer,
  },
});
