import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Priority } from "../types/priority";

export const priorityApi = createApi({
  reducerPath: "priorityApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URL}/priorities/`,
  }),
  endpoints: (builder) => ({
    getPriorities: builder.query<Priority[], void>({
      query: () => "",
    }),
  }),
});
export const { useGetPrioritiesQuery } = priorityApi;
