import { createSlice } from "@reduxjs/toolkit";
import { boards } from "../temp/boards";

const initialState = {};

export const activeBoardSlice = createSlice({
  name: "active_board",
  initialState,
  reducers: {
    fetchBoard: (state, actions) => {
      return boards.find((b) => b.id == actions.payload.id); //not strictly equal because id in action is a string
    },
  },
});

export const { fetchBoard } = activeBoardSlice.actions;

export default activeBoardSlice.reducer;