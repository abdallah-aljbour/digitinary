import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./reducers/taskSlice"; // Import the slice reducer

const store = configureStore({
  reducer: {
    task: taskReducer, // Add the task slice to the store
  },
});

export default store;
