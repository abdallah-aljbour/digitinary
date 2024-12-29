import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    reduxFavorites: [],
  },
  reducers: {
    addToReduxFavorites: (state, action) => {
      state.reduxFavorites.push(action.payload);
    },
    removeFromReduxFavorites: (state, action) => {
      state.reduxFavorites = state.reduxFavorites.filter(
        (task) => task.id !== action.payload
      );
    },
  },
});

export const { addToReduxFavorites, removeFromReduxFavorites } =
  taskSlice.actions;
export default taskSlice.reducer;
