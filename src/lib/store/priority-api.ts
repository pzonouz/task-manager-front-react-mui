import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Priority } from "../types/priority";
// Define a service using a base URL and expected endpoints
export const priorityApi = createApi({
  reducerPath: "priorityApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/" }),
  endpoints: (builder) => ({
    getPriorities: builder.query<Priority[], void>({
      query: () => "/priorities/",
    }),
  }),
});
export const { useGetPrioritiesQuery } = priorityApi;
