import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  registerRequest,
  registerSuccess,
  registerFailure,
  // selectAuth,
} from "../features/auth/authSlice";
import {
  TextField,
  Button,
  CircularProgress,
  Alert,
  Container,
  Paper,
} from "@mui/material";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const { loading, error } = useSelector(selectAuth);
  const auth = useSelector((state) => state.auth) || {};
  const { loading = false, error = null } = auth;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    dispatch(registerRequest());

    try {
      // Simulate API call - replace with actual API call
      const response = {
        data: {
          token: "fake-jwt-token",
          user: {
            name: formData.name,
            email: formData.email,
          },
        },
      };

      dispatch(registerSuccess(response.data));
      localStorage.setItem("token", response.data.token);
      navigate("../home");
    } catch (error) {
      dispatch(registerFailure("Registration failed. Please try again."));
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 3, marginTop: 4 }}>
        <h2>Register</h2>
        <form onSubmit={handleRegister}>
          <TextField
            name="name"
            label="Name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            name="email"
            label="Email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            name="password"
            label="Password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
            sx={{ mt: 2 }}
          >
            {loading ? <CircularProgress size={24} /> : "Register"}
          </Button>
        </form>
        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}
        <Button onClick={() => navigate("/login")} fullWidth sx={{ mt: 2 }}>
          Already have an account? Login
        </Button>
      </Paper>
    </Container>
  );
};

export default Register;
