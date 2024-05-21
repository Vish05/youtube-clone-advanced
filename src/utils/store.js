import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./appSlice";
import searchSlices from "./searchSlices";
import chatSlice from "./chatSlice";

const store = configureStore({
  reducer: {
    app: appSlice,
    search: searchSlices,
    chat: chatSlice,
  },
});

export default store;
