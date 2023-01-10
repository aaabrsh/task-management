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
  },
});

export const { fetchAllBoards } = boardSlice.actions;

export default boardSlice.reducer;
