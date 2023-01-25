import { createSlice } from "@reduxjs/toolkit";
import { api_url } from "../env";

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
    updateBoard: (state, action) => {
      let boards = [...state];
      const board = boards.find((b) => b._id === action.payload.id);
      const index = boards.indexOf(board);
      boards[index] = { ...action.payload.data };
      return boards;
    },
    removeTask: (state, action) => {
      return [...state.filter((board) => board._id != action.payload.id)];
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
    return true;
  } catch (err) {
    // throw new Error(err);
    console.log(err);
    return false;
  }
};

export const addNewBoard = (payload) => async (dispatch) => {
  try {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ payload: { ...payload } }),
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

export const editBoard = (id, payload) => async (dispatch) => {
  try {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ payload: { ...payload } }),
    };
    let response = await fetch(`${api_url}/boards/${id}`, requestOptions);
    response = await response.json();

    if (response.success) {
      dispatch(updateBoard({ id: id, data: response.data }));
      return true;
    } else {
      throw new Error("couldn't update board");
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const deleteBoard = (board_id) => async (dispatch) => {
  try {
    let response = await fetch(`${api_url}/boards/${board_id}`, {
      method: "DELETE",
    });
    response = await response.json();

    if (response.success) {
      dispatch(removeTask({ id: response.data._id }));
      return true;
    } else {
      throw new Error("couldn't delete board");
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const { setBoards, addBoard, updateBoard, removeTask } =
  boardSlice.actions;

export default boardSlice.reducer;
