// // store.js
// import { configureStore } from "@reduxjs/toolkit";
// import taskReducer from "./reducers/taskSlice";
// import { persistStore, persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage";

// const persistConfig = {
//   key: "root",
//   storage,
// };

// const persistedReducer = persistReducer(persistConfig, taskReducer);

// export const store = configureStore({
//   reducer: {
//     tasks: persistedReducer,
//   },
// });

// export const persistor = persistStore(store);

// import { configureStore } from "@reduxjs/toolkit";
// import taskReducer from "./reducers/taskSlice";
// import authReducer from "../tasks/axiosTask/features/auth/authSlice";
// import productReducer from "../tasks/axiosTask/features/products/productSlice";
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

// // Redux Persist Configuration for Auth
// const authPersistConfig = {
//   key: "auth",
//   version: 1,
//   storage,
//   whitelist: ["token", "user"], // Fields to persist
// };

// // Create persisted reducers
// const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

// // Redux Persist Configuration for Tasks (if you need persistence for tasks as well)
// const taskPersistConfig = {
//   key: "root",
//   storage,
// };

// const persistedTaskReducer = persistReducer(taskPersistConfig, taskReducer);

// export const store = configureStore({
//   reducer: {
//     auth: persistedAuthReducer, // Auth Reducer with persistence
//     products: productReducer, // Products Reducer
//     tasks: persistedTaskReducer, // Task Reducer with persistence
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER], // Ignoring certain actions from redux-persist
//       },
//     }),
// });

// export const persistor = persistStore(store);

import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./reducers/taskSlice";
import authReducer from "../tasks/axiosTask/features/auth/authSlice";
import productReducer from "../tasks/axiosTask/features/products/productSlice";
import cartReducer from "../tasks/axiosTask/features/products/cartSlice";
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

// Redux Persist Configuration for Auth
const authPersistConfig = {
  key: "auth",
  version: 1,
  storage,
  whitelist: ["token", "user"],
};

// Redux Persist Configuration for Cart
const cartPersistConfig = {
  key: "cart",
  version: 1,
  storage,
  whitelist: ["items", "totalQuantity", "totalAmount"],
};

// Redux Persist Configuration for Tasks
const taskPersistConfig = {
  key: "root",
  storage,
};

// Create persisted reducers
const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
const persistedCartReducer = persistReducer(cartPersistConfig, cartReducer);
const persistedTaskReducer = persistReducer(taskPersistConfig, taskReducer);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    products: productReducer,
    tasks: persistedTaskReducer,
    cart: persistedCartReducer, // Added cart reducer with persistence
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
