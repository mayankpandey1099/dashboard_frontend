import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RanksState, User } from "../../utils/Types";

const initialState: RanksState = {
  ranking: [],
};

const ranksSlice = createSlice({
  name: "ranks",
  initialState,
  reducers: {
    setRanking: (state, action: PayloadAction<User[]>) => {
      state.ranking = action.payload;
    },
  },
});

export const { setRanking } = ranksSlice.actions;
export const RankReducer =  ranksSlice.reducer;
