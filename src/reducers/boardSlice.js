import { createSlice } from "@reduxjs/toolkit";
import { api_url } from "../env";
import { boards } from "../temp/boards";

const initialState = [];

export const boardSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {
    addBoards: (state) => {
      //redux toolkit automatically generate actions corresponding to the reducer names given here
      return [...state];
    },
  },
});

export const fetchBoards = () => async (dispatch) => {
  try {
    const response = await fetch(`${api_url}/boards`);
    response = response.json();
    if (response.success) {
      dispatch(addBoards(response.data));
    } else {
      dispatch(addBoards([]));
    }
  } catch (err) {
    throw new Error(err);
  }
};

export const { addBoards } = boardSlice.actions;

export default boardSlice.reducer;
