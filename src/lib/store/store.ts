import { configureStore } from "@reduxjs/toolkit";
import { priorityApi } from "./priority-api";
export const store = configureStore({
  reducer: {
    [priorityApi.reducerPath]: priorityApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(priorityApi.middleware),
});
