import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  loginRequest,
  loginSuccess,
  loginFailure,
} from "../features/auth/authSlice";
import useFormValidation from "../../../reusableComponent/formValidationHook";
import FormInput from "../../../reusableComponent/formInput";
import Button from "../../../reusableComponent/button";
import { validationRules } from "../../../reusableComponent/validationRules";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth) || {};
  const { loading = false, error = null } = auth;

  const initialState = {
    email: "",
    password: "",
  };

  const { formData, formErrors, handleChange, hasErrors } = useFormValidation(
    initialState,
    {
      email: validationRules.email,
      password: validationRules.password,
    }
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (hasErrors()) return;

    dispatch(loginRequest());

    const { email, password } = formData;

    const storedData = JSON.parse(localStorage.getItem("persist:auth"));
    const storedUser = storedData ? JSON.parse(storedData.user) : null;

    if (!storedUser) {
      dispatch(loginFailure("User does not exist. Please register first."));
      return;
    }

    if (storedUser.email === email) {
      if (storedUser.password === password) {
        const response = {
          data: {
            user: {
              id: 1,
              name: formData.name,
              email: formData.email,
            },
            token:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
          },
        };

        dispatch(loginSuccess(response.data));
        localStorage.setItem("token" , response.data.token)
        navigate("/");
      } else {
        dispatch(loginFailure("Incorrect password. Please try again."));
      }
    } else {
      dispatch(loginFailure("Email does not match any user."));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="bg-white/70 backdrop-blur-lg rounded-3xl p-8 shadow-xl">
          <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-8">
            Sign In
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <FormInput
              name="email"
              label="Email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={formErrors.email}
              required
            />

            <FormInput
              name="password"
              label="Password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              error={formErrors.password}
              required
            />

            <Button
              type="submit"
              disabled={loading || hasErrors()}
              className="w-full bg-white text-indigo-600 font-bold px-6 py-4 rounded-xl border-2 border-indigo-600 shadow-md transition-all duration-300 transform hover:bg-indigo-600 hover:text-white hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          {error && (
            <div className="mt-4 p-3 rounded bg-red-50 text-red-600">
              {error}
            </div>
          )}

          <Button
            onClick={() => navigate("/")}
            className="w-full mt-4 bg-white text-indigo-600 font-bold px-6 py-4 rounded-xl border-2 border-indigo-600 shadow-md transition-all duration-300 transform hover:bg-indigo-600 hover:text-white hover:scale-105"
          >
            Visit as a Guest
          </Button>

          <Button
            onClick={() => navigate("/axiosRegister")}
            disabled={loading}
            className="w-full mt-4 bg-transparent text-indigo-600 font-medium px-6 py-2 rounded-xl hover:bg-indigo-50 transition-all duration-300"
          >
            Don't have an account? Sign Up
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
