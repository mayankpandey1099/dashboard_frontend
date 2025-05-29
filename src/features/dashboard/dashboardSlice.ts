import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { DashboardState, User } from "../../utils/Types";

const initialState: DashboardState = {
  activeUsers: [],
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setActiveUsers: (state, action: PayloadAction<User[]>) => {
      state.activeUsers = action.payload;
    },
  },
});

export const { setActiveUsers } = dashboardSlice.actions;
export const DashboardReducer = dashboardSlice.reducer;
