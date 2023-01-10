import { configureStore } from "@reduxjs/toolkit";
import boardReducer from "./reducers/boardSlice";
import tasksReducer from "./reducers/taskSlice";

export const store = configureStore({
  reducer: {
    boards: boardReducer,
    tasks: tasksReducer,
  },
});
