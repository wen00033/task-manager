import headerSlice from "./Features/headerTask/headerSlice";

import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    header: headerSlice,
  },
});

export default store;
