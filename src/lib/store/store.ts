import { configureStore } from "@reduxjs/toolkit";
import { priorityApi } from "../services/priority-api";
import { categoryApi } from "../services/category-api";
import { taskApi } from "../services/task-api";
export const store = configureStore({
  reducer: {
    [priorityApi.reducerPath]: priorityApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [taskApi.reducerPath]: taskApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(priorityApi.middleware)
      .concat(categoryApi.middleware)
      .concat(taskApi.middleware),
});
