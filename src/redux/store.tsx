import { configureStore } from "@reduxjs/toolkit";
import socketReducer from "../features/socket/socketSlice";
import { AuthReducer } from "../features/auth/authSlice";
import { DashboardReducer } from "../features/dashboard/dashboardSlice";
import { PlayerReducer } from "../features/player/playerSlice";
import { RankReducer } from "../features/ranks/rankSlice";

export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    dashboard: DashboardReducer,
    player: PlayerReducer,
    ranks: RankReducer,
    socket: socketReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

