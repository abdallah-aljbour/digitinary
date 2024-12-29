// import React, { createContext, useReducer, useContext } from "react";

// const TaskContext = createContext();

// const taskReducer = (state, action) => {
//   switch (action.type) {
//     case "ADD_TASK":
//       return { ...state, tasks: [...state.tasks, action.payload] };
//     case "DELETE_TASK":
//       return {
//         ...state,
//         tasks: state.tasks.filter((task) => task.id !== action.payload),
//       };
//     case "EDIT_TASK":
//       return {
//         ...state,
//         tasks: state.tasks.map((task) =>
//           task.id === action.payload.id ? action.payload : task
//         ),
//       };
//     case "SET_PRIORITY_FILTER":
//       return { ...state, priorityFilter: action.payload };
//     case "SET_DUE_DATE_FILTER":
//       return { ...state, dueDateFilter: action.payload };
//     case "SET_SORT_ORDER":
//       return {
//         ...state,
//         sortField: action.payload.field,
//         sortOrder: action.payload.order,
//       };
//     default:
//       return state;
//   }
// };

// export const TaskProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(taskReducer, {
//     tasks: [],
//     priorityFilter: "",
//     dueDateFilter: "",
//     sortField: "dueDate",
//     sortOrder: "asc",
//   });

//   return (
//     <TaskContext.Provider value={{ state, dispatch }}>
//       {children}
//     </TaskContext.Provider>
//   );
// };

// export const useTaskContext = () => useContext(TaskContext);
// src/context/TaskContext.js
import React, { createContext, useReducer, useContext, useEffect } from "react";

const TaskContext = createContext();

// Constants for localStorage keys
const TASKS_STORAGE_KEY = "tasks";
const FAVORITES_STORAGE_KEY = "favoriteTasks";

const loadFromLocalStorage = (key, defaultValue) => {
  try {
    const savedData = localStorage.getItem(key);
    return savedData ? JSON.parse(savedData) : defaultValue;
  } catch (error) {
    console.error(
      `Error loading data from localStorage for key ${key}:`,
      error
    );
    return defaultValue;
  }
};

const saveToLocalStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error saving data to localStorage for key ${key}:`, error);
  }
};

const taskReducer = (state, action) => {
  let newState;

  switch (action.type) {
    case "ADD_TASK":
      newState = { ...state, tasks: [...state.tasks, action.payload] };
      saveToLocalStorage(TASKS_STORAGE_KEY, newState.tasks);
      return newState;

    case "DELETE_TASK":
      newState = {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
        favorites: state.favorites.filter((task) => task.id !== action.payload),
      };
      saveToLocalStorage(TASKS_STORAGE_KEY, newState.tasks);
      saveToLocalStorage(FAVORITES_STORAGE_KEY, newState.favorites);
      return newState;

    case "EDIT_TASK":
      newState = {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id ? action.payload : task
        ),
        favorites: state.favorites.map((task) =>
          task.id === action.payload.id ? action.payload : task
        ),
      };
      saveToLocalStorage(TASKS_STORAGE_KEY, newState.tasks);
      saveToLocalStorage(FAVORITES_STORAGE_KEY, newState.favorites);
      return newState;

    case "ADD_TO_FAVORITES":
      if (!state.favorites.some((task) => task.id === action.payload.id)) {
        newState = {
          ...state,
          favorites: [...state.favorites, action.payload],
        };
        saveToLocalStorage(FAVORITES_STORAGE_KEY, newState.favorites);
        return newState;
      }
      return state;

    case "REMOVE_FROM_FAVORITES":
      newState = {
        ...state,
        favorites: state.favorites.filter((task) => task.id !== action.payload),
      };
      saveToLocalStorage(FAVORITES_STORAGE_KEY, newState.favorites);
      return newState;

    case "SET_PRIORITY_FILTER":
      return { ...state, priorityFilter: action.payload };

    case "SET_DUE_DATE_FILTER":
      return { ...state, dueDateFilter: action.payload };

    case "SET_SORT_ORDER":
      return {
        ...state,
        sortField: action.payload.field,
        sortOrder: action.payload.order,
      };

    default:
      return state;
  }
};

export const TaskProvider = ({ children }) => {
  // Initialize state with data from localStorage
  const [state, dispatch] = useReducer(taskReducer, {
    tasks: loadFromLocalStorage(TASKS_STORAGE_KEY, []),
    favorites: loadFromLocalStorage(FAVORITES_STORAGE_KEY, []),
    priorityFilter: "",
    dueDateFilter: "",
    sortField: "dueDate",
    sortOrder: "asc",
  });

  // Optional: Sync state with localStorage whenever it changes
  useEffect(() => {
    saveToLocalStorage(TASKS_STORAGE_KEY, state.tasks);
    saveToLocalStorage(FAVORITES_STORAGE_KEY, state.favorites);
  }, [state.tasks, state.favorites]);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => useContext(TaskContext);
