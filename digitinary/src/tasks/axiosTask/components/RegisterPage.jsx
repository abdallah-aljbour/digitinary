import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  registerRequest,
  registerSuccess,
  registerFailure,
} from "../features/auth/authSlice";
import useFormValidation from "../../../reusableComponent/formValidationHook";
import { validationRules } from "../../../reusableComponent/validationRules";
import FormInput from "../../../reusableComponent/formInput";
import Button from "../../../reusableComponent/button";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading = false, error = null } =
    useSelector((state) => state.auth) || {};

  const initialState = {
    name: "",
    email: "",
    password: "",
  };

  const { formData, formErrors, handleChange, hasErrors } = useFormValidation(
    initialState,
    validationRules
  );

  const handleRegister = async (e) => {
    e.preventDefault();
    if (hasErrors()) return;

    dispatch(registerRequest());

    try {
      const response = {
        data: {
          token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
          user: {
            name: formData.name,
            email: formData.email,
            password: formData.password,
          },
        },
      };

      dispatch(registerSuccess(response.data));
      navigate("../axiosLogin");
    } catch (error) {
      dispatch(registerFailure("Registration failed. Please try again."));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="bg-white/70 backdrop-blur-lg rounded-3xl p-8 shadow-xl">
          <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-8">
            Register
          </h2>

          <form onSubmit={handleRegister} className="space-y-6">
            <FormInput
              name="name"
              label="Name"
              value={formData.name}
              onChange={handleChange}
              error={formErrors.name}
              required
            />

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
              {loading ? "Registering..." : "Register"}
            </Button>
          </form>

          {error && (
            <div className="mt-4 p-3 rounded bg-red-50 text-red-600">
              {error}
            </div>
          )}

          <Button
            onClick={() => navigate("../login")}
            className="w-full mt-4 bg-transparent text-indigo-600 font-medium px-6 py-2 rounded-xl hover:bg-indigo-50 transition-all duration-300"
          >
            Already have an account? Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Register;
