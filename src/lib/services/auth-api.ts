import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { JWTAccess, User } from "../types/User";

export const authApi = createApi({
  reducerPath: "authApi",
  tagTypes: ["auth"],
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URL}/auth/`,
  }),
  endpoints: (builder) => ({
    signin: builder.mutation<JWTAccess, Partial<User>>({
      query: ({ ...user }) => ({
        url: "jwt/create",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["auth"],
    }),
    signup: builder.mutation<User, Partial<User>>({
      query: ({ ...user }) => ({
        url: "/users/",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["auth"],
    }),
  }),
});
export const { useSigninMutation, useSignupMutation } = authApi;
