import { createSlice } from "@reduxjs/toolkit";
import { api_url } from "../env";

const initialState = [];

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTasks: (state, action) => {
      return [...action.payload];
    },
    addTask: (state, action) => {
      return [...state, { ...action.payload }];
    },
    updateTask: (state, action) => {
      let tasks = [...state];
      const task = tasks.find((t) => t._id === action.payload.id);
      const index = tasks.indexOf(task);
      tasks[index] = { ...action.payload.data };
      return tasks;
    },
    removeTask: (state, action) => {
      return [...state.filter((t) => t._id != action.payload.id)];
    },
  },
});

export const fetchTasks = (id) => async (dispatch) => {
  try {
    let response = await fetch(`${api_url}/tasks/${id}`);
    response = await response.json();
    if (response.success) {
      response.data.forEach((res) => {
        if (res.deadline) {
          res.deadline = new Date(res.deadline).toISOString().split("T")[0];
        }
      });
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
      if (response.data.deadline) {
        response.data.deadline = new Date(response.data.deadline)
          .toISOString()
          .split("T")[0];
      }
      dispatch(addTask(response.data));
      return true;
    } else {
      return response;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const editTask = (task_id, payload) => async (dispatch) => {
  try {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ payload: { ...payload } }),
    };
    let response = await fetch(`${api_url}/tasks/${task_id}`, requestOptions);
    response = await response.json();

    if (response.success) {
      if (response.data.deadline) {
        response.data.deadline = new Date(response.data.deadline)
          .toISOString()
          .split("T")[0];
      }
      dispatch(updateTask({ id: task_id, data: response.data }));
      return true;
    } else {
      return response;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const deleteTask = (task_id) => async (dispatch) => {
  try {
    let response = await fetch(`${api_url}/tasks/${task_id}`, {
      method: "DELETE",
    });
    response = await response.json();

    if (response.success) {
      dispatch(removeTask({ id: response.data._id }));
    } else {
      throw new Error("couldn't delete task");
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const { setTasks, removeTask, addTask, updateTask } = tasksSlice.actions;

export default tasksSlice.reducer;
