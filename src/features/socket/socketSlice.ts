import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface SocketState {
  isConnected: boolean;
}

const initialState: SocketState = {
  isConnected: false,
};

const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    setIsConnected: (state, action: PayloadAction<boolean>) => {
      state.isConnected = action.payload;
    },
  },
});

export const { setIsConnected } = socketSlice.actions;
export default socketSlice.reducer;
