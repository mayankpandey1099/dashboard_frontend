import { configureStore } from "@reduxjs/toolkit";
import { AuthReducer } from "../features/auth/authSlice";
import { DashboardReducer } from "../features/dashboard/dashboardSlice";

export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    dashboard: DashboardReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
