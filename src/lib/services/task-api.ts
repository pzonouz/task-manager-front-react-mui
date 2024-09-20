import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Task } from "../types/task";

export const taskApi = createApi({
  reducerPath: "taskApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URL}/tasks/`,
  }),
  endpoints: (builder) => ({
    createTask: builder.mutation<Task, Partial<Task>>({
      query: ({ ...task }) => ({ url: "", body: task, method: "POST" }),
    }),
  }),
});
export const { useCreateTaskMutation } = taskApi;
