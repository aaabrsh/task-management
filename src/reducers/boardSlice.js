import { createSlice } from "@reduxjs/toolkit";
import { api_url } from "../env";
import { boards } from "../temp/boards";

const initialState = [];

export const boardSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {
    setBoards: (state, action) => {
      //redux toolkit automatically generate actions corresponding to the reducer names given here
      return [...action.payload];
    },
    addBoard: (state) => {
      return;
    },
  },
});

export const fetchBoards = () => async (dispatch) => {
  try {
    let response = await fetch(`${api_url}/boards`);
    response = await response.json();
    if (response.success) {
      dispatch(setBoards(response.data));
    } else {
      dispatch(setBoards([]));
    }
  } catch (err) {
    // throw new Error(err);
    console.log(err);
  }
};

export const addNewBoard = (data) => async (dispatch) => {
  try {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ payload: { ...data } }),
    };
    let response = await fetch(`${api_url}/boards`, requestOptions);
    response = await response.json();

    if (response.success) {
      dispatch(addBoard(response.data));
      return true;
    } else {
      throw new Error("couldn't add new board");
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const { setBoards, addBoard } = boardSlice.actions;

export default boardSlice.reducer;
