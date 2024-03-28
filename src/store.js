import TaskManagerSlice from "./Features/TaskManager/TaskManagerSlice";

import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    TaskManager: TaskManagerSlice,
  },
});

export default store;
