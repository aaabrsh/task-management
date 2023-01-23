import { createSlice } from "@reduxjs/toolkit";
import { api_url } from "../env";
import { tasks } from "../temp/tasks";

const initialState = [];

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTasks: (state, action) => {
      return [...action.payload];
    },
    addTask: (state, action) => {
      console.log(action.payload)
      return [...state, {...action.payload}];
    },
    moveTask: (state, action) => {
      const tasks = [...state];
      const task = tasks.find((task) => task._id === action.payload.id);
      const index = tasks.indexOf(task);
      tasks[index] = { ...tasks[index], status: action.payload.destination };
      return tasks;
    },
  },
});

export const fetchTasks = (id) => async (dispatch) => {
  try {
    let response = await fetch(`${api_url}/tasks/${id}`);
    response = await response.json();
    if (response.success) {
      dispatch(setTasks(response.data));
      return true;
    } else {
      throw new Error("couldn't fetch tasks");
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const addNewTask = (board_id, payload) => async (dispatch) => {
  try {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ payload: { ...payload, board: board_id } }),
    };
    let response = await fetch(`${api_url}/tasks`, requestOptions);
    response = await response.json();

    if (response.success) {
      dispatch(addTask(response.data));
      return true;
    } else {
      return response
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const { setTasks, moveTask, addTask } = tasksSlice.actions;

export default tasksSlice.reducer;
