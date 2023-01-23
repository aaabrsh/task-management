import { createSlice } from "@reduxjs/toolkit";
import { api_url } from "../env";

const initialState = {};

export const activeBoardSlice = createSlice({
  name: "active_board",
  initialState,
  reducers: {
    setActiveBoard: (state, action) => {
      return { ...action.payload };
    },
  },
});

export const fetchBoard = (id) => async (dispatch) => {
  try {
    let response = await fetch(`${api_url}/boards/${id}`);
    response = await response.json();
    if (response.success) {
      dispatch(setActiveBoard(response.data));
      return true;
    } else {
      throw new Error("couldn't find board");
    }
  } catch (err) {
    // throw new Error(err);
    console.log(err);
    return false;
  }
};

export const { setActiveBoard } = activeBoardSlice.actions;

export default activeBoardSlice.reducer;
