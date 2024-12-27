import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
  name: "task",
  initialState: {
    task: null,
  },
  reducers: {
    setTask(state, action) {
      state.task = action.payload;
    },
  },
});

export const { setTask } = taskSlice.actions; // Export the action
export default taskSlice.reducer; // Export the reducer
