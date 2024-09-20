import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Category } from "../types/category";

export const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URL}/categories/`,
  }),
  endpoints: (builder) => ({
    getCategories: builder.query<Category[], void>({
      query: () => "",
    }),
  }),
});

export const { useGetCategoriesQuery } = categoryApi;
