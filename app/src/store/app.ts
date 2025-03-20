import { configureStore } from "@reduxjs/toolkit";
import { usersApiSlice } from "./user/usersApiSlice";

import testReducer from "./user/testSlice";
import { userPermissionsApiSlice } from "./permissions/userPermissionApiSlice";

export const store = configureStore({
  reducer: {
    test: testReducer,
    [usersApiSlice.reducerPath]: usersApiSlice.reducer,
    [userPermissionsApiSlice.reducerPath]: userPermissionsApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      usersApiSlice.middleware,
      userPermissionsApiSlice.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
