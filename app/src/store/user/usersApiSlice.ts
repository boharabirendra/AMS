import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { UserTableProps } from "../../interfaces/user";

export const usersApiSlice = createApi({
  reducerPath: "users",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/v1/users",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
    }),

    logout: builder.mutation<void, void>({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
    }),
    getUsers: builder.query<UserTableProps, void>({
      query: () => "/",
    }),
  }),
});

export const { useGetUsersQuery, useLoginMutation, useLogoutMutation } =
  usersApiSlice;
