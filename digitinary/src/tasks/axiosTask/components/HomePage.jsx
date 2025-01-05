import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout, selectAuth } from "../features/auth/authSlice";
import { Typography, Container, Paper, Button } from "@mui/material";

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(selectAuth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 3, marginTop: 4 }}>
        <Typography variant="h4" gutterBottom>
          Welcome, {user?.name || "Guest"}!
        </Typography>
        {user ? (
          <>
            <Typography variant="h6" paragraph>
              Email: {user.email}
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleLogout}
              fullWidth
            >
              Logout
            </Button>
          </>
        ) : (
          <Typography variant="body1" color="textSecondary">
            You are not logged in.
          </Typography>
        )}
      </Paper>
    </Container>
  );
};

export default HomePage;
