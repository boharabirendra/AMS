import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/v1",
  }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/",
    }),
    getUserById: builder.query({
      query: (id) => `/${id}`,
    }),
    addUser: builder.mutation({
      query: (newUser) => ({
        url: "/",
        method: "POST",
        body: newUser,
      }),
    }),
  }),
});

export const { useGetUsersQuery, useLazyGetUserByIdQuery, useAddUserMutation } =
  api;
