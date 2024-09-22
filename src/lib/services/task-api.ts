import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Task } from "../types/task";

export const taskApi = createApi({
  reducerPath: "taskApi",
  tagTypes: ["tasks"],
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URL}/tasks/`,
  }),
  endpoints: (builder) => ({
    getTasks: builder.query<Task[], void>({
      query: () => ({ url: "", method: "GET" }),
      providesTags: ["tasks"],
    }),
    getTask: builder.query<Task, string>({
      query: (slug: string) => ({ url: `/${slug}/`, method: "GET" }),
      providesTags: ["tasks"],
    }),
    createTask: builder.mutation<Task, Partial<Task>>({
      query: ({ ...task }) => ({ url: "", body: task, method: "POST" }),
      invalidatesTags: ["tasks"],
    }),
  }),
});
export const { useCreateTaskMutation, useGetTasksQuery, useGetTaskQuery } =
  taskApi;
