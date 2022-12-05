import { configureStore, combineReducers } from "@reduxjs/toolkit";

import taskReducer from "./reducers/TaskSlice";

const rootReducer = combineReducers({
  taskReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};
