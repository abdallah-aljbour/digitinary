import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import ChatApplication from "./tasks/chatapplication1";
import TaskApplicationManagement from "./tasks/taskmanagementapplication";
import FavoritesListC from "./tasks/taskmanagementapplication/folders/components/FavoritesListC";
import FavoritesListR from "./tasks/taskmanagementapplication/folders/components/FavoritesListR";
import { TaskProvider } from "./tasks/taskmanagementapplication/folders/context/TaskContext";
import AxiosTask from "./tasks/axiosTask/App";
// import Login from "./tasks/axiosTask/components/Login";
// import HomePage from "./tasks/axiosTask/components/HomePage";
// import PrivateRoute from "./tasks/axiosTask/components/PrivateRoute";
// import Register from "./tasks/axiosTask/components/RegisterPage";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#f50057",
    },
    background: {
      default: "#f5f5f5",
      paper: "#ffffff",
    },
  },
  typography: {
    h4: {
      fontWeight: 600,
      letterSpacing: "0.02em",
    },
    button: {
      textTransform: "none",
      fontWeight: 500,
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: "8px 16px",
          margin: "0 4px",
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <TaskProvider>
          <Router>
            <Box
              sx={{
                minHeight: "100vh",
                bgcolor: "background.default",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <AppBar position="static" elevation={0}>
                <Toolbar sx={{ justifyContent: "space-between" }}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      background:
                        "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
                      backgroundClip: "text",
                      WebkitBackgroundClip: "text",
                      color: "transparent",
                    }}
                  >
                    Company Task Manager
                  </Typography>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    {[
                      { to: "/", label: "Home" },
                      { to: "/chatapplication", label: "Chat Application" },
                      {
                        to: "/taskapplicationmanagement",
                        label: "Task Management",
                      },
                      { to: "/axiosTask", label: "Axios Task" },
                    ].map((item) => (
                      <Button
                        key={item.to}
                        component={Link}
                        to={item.to}
                        color="inherit"
                        sx={{
                          "&:hover": {
                            bgcolor: "rgba(255,255,255,0.1)",
                            transform: "translateY(-2px)",
                          },
                          transition: "all 0.2s",
                        }}
                      >
                        {item.label}
                      </Button>
                    ))}
                  </Box>
                </Toolbar>
              </AppBar>

              <Container
                maxWidth="lg"
                sx={{
                  mt: 8,
                  mb: 4,
                  flex: 1,
                }}
              >
                <Routes>
                  <Route
                    path="/"
                    element={
                      <Paper
                        elevation={0}
                        sx={{
                          p: 6,
                          borderRadius: 4,
                          textAlign: "center",
                          background:
                            "linear-gradient(145deg, #ffffff 0%, #f4f4f4 100%)",
                          border: "1px solid rgba(0,0,0,0.05)",
                        }}
                      >
                        <Typography
                          variant="h4"
                          gutterBottom
                          sx={{
                            mb: 3,
                            background:
                              "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                            backgroundClip: "text",
                            WebkitBackgroundClip: "text",
                            color: "transparent",
                          }}
                        >
                          Welcome to the Application
                        </Typography>
                        <Typography
                          variant="body1"
                          sx={{
                            color: "text.secondary",
                            maxWidth: "600px",
                            mx: "auto",
                            lineHeight: 1.8,
                          }}
                        >
                          Select a task from the navigation bar above to get
                          started.
                        </Typography>
                      </Paper>
                    }
                  />
                  <Route
                    path="/chatapplication"
                    element={<ChatApplication />}
                  />
                  <Route
                    path="/context-favorites"
                    element={<FavoritesListC />}
                  />
                  <Route path="/redux-favorites" element={<FavoritesListR />} />
                  <Route path="/axiosTask/*" element={<AxiosTask />} />
                  <Route
                    path="/taskapplicationmanagement"
                    element={<TaskApplicationManagement />}
                  />
                  {/* <Route path="/login" element={<Login />} /> */}
                  {/* <Route
                    path="/home"
                    element={
                      <PrivateRoute>
                        <HomePage />
                      </PrivateRoute>
                    }
                  /> */}
                  {/* <Route
                    path="/"
                    element={
                      <PrivateRoute>
                        <HomePage />
                      </PrivateRoute>
                    }
                  /> */}
                  {/* <Route path="/register" element={<Register />} /> */}
                </Routes>
              </Container>
            </Box>
          </Router>
        </TaskProvider>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
