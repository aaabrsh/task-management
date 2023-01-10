import { configureStore } from "@reduxjs/toolkit";
import boardReducer from "./reducers/boardSlice";
import tasksReducer from "./reducers/taskSlice";
import activeBoardReducer from "./reducers/activeBoardSlice";

export const store = configureStore({
  reducer: {
    boards: boardReducer,
    tasks: tasksReducer,
    active_board: activeBoardReducer,
  },
});
