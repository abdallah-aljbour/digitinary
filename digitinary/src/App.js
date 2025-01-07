// Import React and core dependencies
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Redux and persistence
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store";

// Context Provider
import { TaskProvider } from "./tasks/taskmanagementapplication/folders/context/TaskContext";

// Material-UI (MUI) theme and components

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

// Reusable components
import Navbar from "./tasks/axiosTask/components/Navbar";
import ThemeProvider from "./reusableComponent/themProvider";

// Application pages
import HomePageMain from "./component/home";
import ChatApplication from "./tasks/chatapplication1";
import TaskApplicationManagement from "./tasks/taskmanagementapplication";
import FavoritesListC from "./tasks/taskmanagementapplication/folders/components/FavoritesListC";
import FavoritesListR from "./tasks/taskmanagementapplication/folders/components/FavoritesListR";
import AxiosTask from "./tasks/axiosTask/App";
import Login from "./tasks/axiosTask/components/Login";
import Register from "./tasks/axiosTask/components/RegisterPage";
import HomePage from "./tasks/axiosTask/components/HomePage";
import ProductDetails from "./tasks/axiosTask/components/ProductDetails";
import CartPage from "./tasks/axiosTask/components/CartPage";
import Cart from "./tasks/axiosTask/components/Cart";
import AddProduct from "./tasks/axiosTask/components/AddProduct";

// Route protection component
import PrivateRoute from "./tasks/axiosTask/components/PrivateRoute";

function App() {
  return (
    <ThemeProvider>
      {/* Redux Provider and PersistGate for state management */}
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {/* Context provider for task management */}
          <TaskProvider>
            {/* Router for managing routes */}
            <Router>
              <Box
                sx={{
                  minHeight: "100vh",
                  bgcolor: "background.default",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {/* Navbar component */}
                <Navbar />
                <Container
                  maxWidth="lg"
                  sx={{
                    mt: 8,
                    mb: 4,
                    flex: 1,
                  }}
                >
                  <Routes>
                    {/* General application routes */}
                    <Route path="/" element={<HomePageMain />} />
                    <Route path="/axiosTask/*" element={<AxiosTask />} />
                    <Route
                      path="/chatapplication"
                      element={<ChatApplication />}
                    />
                    <Route
                      path="/taskapplicationmanagement"
                      element={<TaskApplicationManagement />}
                    />

                    {/* Favorites routes (Context and Redux examples) */}
                    <Route
                      path="/context-favorites"
                      element={<FavoritesListC />}
                    />
                    <Route
                      path="/redux-favorites"
                      element={<FavoritesListR />}
                    />

                    {/* AxiosTask application routes */}

                    <Route path="/axiosLogin" element={<Login />} />
                    <Route path="/axiosRegister" element={<Register />} />
                    <Route path="/storeHome" element={<HomePage />} />
                    <Route
                      path="/home/product/:id"
                      element={
                        <PrivateRoute>
                          <ProductDetails />
                        </PrivateRoute>
                      }
                    />
                    <Route
                      path="/cart"
                      element={
                        <PrivateRoute>
                          <CartPage />
                        </PrivateRoute>
                      }
                    />
                    <Route
                      path="/caart"
                      element={
                        <PrivateRoute>
                          <Cart />
                        </PrivateRoute>
                      }
                    />
                    <Route path="/add-product" element={<AddProduct />} />
                  </Routes>
                </Container>
              </Box>
            </Router>
          </TaskProvider>
        </PersistGate>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
