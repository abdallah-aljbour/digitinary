// // taskSlice.jsx
// import { createSlice } from "@reduxjs/toolkit";

// const taskSlice = createSlice({
//   name: "tasks",
//   initialState: {
//     reduxFavorites: [],
//   },
//   reducers: {
//     addToReduxFavorites: (state, action) => {
//       if (!state.reduxFavorites.some((task) => task.id === action.payload.id)) {
//         state.reduxFavorites.push(action.payload);
//       }
//     },
//     removeFromReduxFavorites: (state, action) => {
//       state.reduxFavorites = state.reduxFavorites.filter(
//         (task) => task.id !== action.payload
//       );
//     },
//   },
// });

// export const { addToReduxFavorites, removeFromReduxFavorites } =
//   taskSlice.actions;
// export default taskSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    reduxFavorites: [],
  },
  reducers: {
    addToReduxFavorites: (state, action) => {
      // Ensure no duplicates
      if (!state.reduxFavorites.some((task) => task.id === action.payload.id)) {
        state.reduxFavorites.push(action.payload);
      }
    },
    removeFromReduxFavorites: (state, action) => {
      state.reduxFavorites = state.reduxFavorites.filter(
        (task) => task.id !== action.payload
      );
    },
    editFavorite: (state, action) => {
      // Find the index of the task to edit
      const index = state.reduxFavorites.findIndex(
        (task) => task.id === action.payload.id
      );

      // If the task is found, update its properties
      if (index !== -1) {
        state.reduxFavorites[index] = {
          ...state.reduxFavorites[index],
          ...action.payload,
        };
      }
    },
  },
});

export const { addToReduxFavorites, removeFromReduxFavorites, editFavorite } =
  taskSlice.actions;

export default taskSlice.reducer;
