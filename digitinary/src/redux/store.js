import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./reducers/taskSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // default storage (localStorage)

// Configure Redux Persist
const persistConfig = {
  key: "root", // This key is used to store the persisted state
  storage, // Specifies to use localStorage
};

const persistedReducer = persistReducer(persistConfig, taskReducer);

export const store = configureStore({
  reducer: {
    tasks: persistedReducer, // Use the persistedReducer
  },
});

export const persistor = persistStore(store); // To handle the persistence
