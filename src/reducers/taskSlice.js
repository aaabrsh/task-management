import { createSlice } from "@reduxjs/toolkit";
import { tasks } from "../temp/tasks";

const initialState = [];

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    fetchAllTasks: (state, action) => {
      return tasks.filter((task) => task.board_id == action.payload.id);
    },
    moveTask: (state, action) => {
      const tasks = [...state];
      const task = tasks.find((task) => task.id === action.payload.id);
      const index = tasks.indexOf(task);
      tasks[index] = { ...tasks[index], status: action.payload.destination };
      return tasks;
    },
  },
});

export const { fetchAllTasks, moveTask } = tasksSlice.actions;

export default tasksSlice.reducer;
