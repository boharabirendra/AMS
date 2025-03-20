import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { FormData, UserTableProps } from "../../interfaces/type";

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

    createUser: builder.mutation({
      query: (usersData) => ({
        url: "/",
        method: "POST",
        body: usersData,
      }),
    }),

    updateUser: builder.mutation({
      query: (usersData) => ({
        url: "/",
        method: "PUT",
        body: usersData,
      }),
    }),

    deleteUserById: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
    }),

    getUserById: builder.query<FormData, number>({
      query: (id) => ({
        url: `/${id}`,
        method: "GET",
      }),
      keepUnusedDataFor: 0,
    }),

    logout: builder.mutation<void, void>({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
    }),

    getUsers: builder.query<UserTableProps, void>({
      query: () => "/",
      keepUnusedDataFor: 0,
    }),
  }),
});

export const {
  useGetUsersQuery,
  useLoginMutation,
  useLogoutMutation,
  useGetUserByIdQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserByIdMutation,
} = usersApiSlice;
