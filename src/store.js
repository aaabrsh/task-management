import { configureStore } from "@reduxjs/toolkit";
import boardReducer from './reducers/boardSlice';

export const store = configureStore({reducer: {boards: boardReducer}})