import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { MenusProps } from "../../components/Menus";

export const userPermissionsApiSlice = createApi({
  reducerPath: "options",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/v1/options",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getMenus: builder.query<MenusProps, void>({
      query: () => "/menus",
      keepUnusedDataFor: 0,
    }),
    getPermissions: builder.query({
      query: () => "/permissions",
    }),
  }),
});

export const { useGetMenusQuery, useGetPermissionsQuery } =
  userPermissionsApiSlice;
