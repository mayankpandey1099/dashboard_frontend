import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { PlayerState } from "../../utils/Types";

const initialState: PlayerState = {
  bananaCount: 0,
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setBananaCount: (state, action: PayloadAction<{ bananaCount: number }>) => {
      state.bananaCount = action.payload.bananaCount;
    },
  },
});

export const { setBananaCount } = playerSlice.actions;
export const PlayerReducer = playerSlice.reducer;
