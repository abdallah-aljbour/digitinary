export const addToReduxFavorites = (task) => ({
  type: "ADD_TO_REDUX_FAVORITES",
  payload: task,
});

export const removeFromReduxFavorites = (taskId) => ({
  type: "REMOVE_FROM_REDUX_FAVORITES",
  payload: taskId,
});

// taskSlice.jsx
const initialState = {
  reduxFavorites: [],
};

export const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_REDUX_FAVORITES":
      return {
        ...state,
        reduxFavorites: [...state.reduxFavorites, action.payload],
      };
    case "REMOVE_FROM_REDUX_FAVORITES":
      return {
        ...state,
        reduxFavorites: state.reduxFavorites.filter(
          (task) => task.id !== action.payload
        ),
      };
    default:
      return state;
  }
};
