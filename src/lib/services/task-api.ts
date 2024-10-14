import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Task } from "../types/task";

export const taskApi = createApi({
  reducerPath: "taskApi",
  tagTypes: ["tasks"],
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URL}/tasks/`,
    headers: {
      "Content-Type": "application/json",
    },
  }),
  endpoints: (builder) => ({
    getTasks: builder.query<Task[], void>({
      query: () => ({ url: "", method: "GET" }),
      providesTags: ["tasks"],
    }),
    getTask: builder.query<Task, string>({
      query: (id: string) => ({ url: `/${id}/`, method: "GET" }),
      providesTags: ["tasks"],
    }),
    completeTask: builder.mutation<void, string>({
      query: (id: string) => ({ url: `/${id}/complete-task/`, method: "GET" }),
      invalidatesTags: ["tasks"],
    }),
    createTask: builder.mutation<Task, Partial<Task>>({
      query: ({ ...task }) => ({ url: "", body: task, method: "POST" }),
      invalidatesTags: ["tasks"],
    }),
    editTask: builder.mutation<Task, Partial<Task> & Pick<Task, "id">>({
      query: ({ id, ...task }) => ({
        url: `/${id}/`,
        body: task,
        method: "PATCH",
      }),
      invalidatesTags: ["tasks"],
    }),
    deleteTask: builder.mutation<Task, string>({
      query: (id: string) => ({
        url: `/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["tasks"],
    }),
  }),
});
export const {
  useCreateTaskMutation,
  useGetTasksQuery,
  useGetTaskQuery,
  useEditTaskMutation,
  useCompleteTaskMutation,
  useDeleteTaskMutation,
} = taskApi;
