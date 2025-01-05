// import { configureStore } from "@reduxjs/toolkit";
// import {
//   persistStore,
//   persistReducer,
//   FLUSH,
//   REHYDRATE,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER,
// } from "redux-persist";
// import storage from "redux-persist/lib/storage";
// import authReducer from "../features/auth/authSlice";

// // Redux Persist Configuration
// const persistConfig = {
//   key: "auth", // Key for persistence
//   version: 1, // Versioning for persistence
//   storage, // Local storage will be used to persist the data
//   whitelist: ["token", "user"], // Only persist token and user data
// };

// // Wrap the reducer with persistReducer
// const persistedReducer = persistReducer(persistConfig, authReducer);

// // Configure Store
// export const store = configureStore({
//   reducer: {
//     auth: persistedReducer, // Add the persisted reducer to the store
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//       },
//     }), // Ignore actions from redux-persist that are non-serializable
// });

// // Initialize the persistor
// export const persistor = persistStore(store);
import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "../features/auth/authSlice";
import productReducer from "../features/products/productSlice";

// Redux Persist Configuration
const persistConfig = {
  key: "auth",
  version: 1,
  storage,
  whitelist: ["token", "user"],
};

const persistedReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: {
    auth: persistedReducer,
    products: productReducer, // Add the products reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
