import { createSlice } from "@reduxjs/toolkit";
import { boards } from "../temp/boards";

const initialState = [];

export const boardSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {
    fetchAllBoards: (state) => {
      //redux toolkit automatically generate actions corresponding to the reducer names given here
      return [...boards];
    },
    fetchBoard: (state, actions) => {
      return boards.find((b) => b.id == actions.payload.id); //not strictly equal because id in action is a string
    },
  },
});

export const { fetchAllBoards, fetchBoard } = boardSlice.actions;

export default boardSlice.reducer;
