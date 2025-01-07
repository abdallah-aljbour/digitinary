// import React from "react";
// import { useSelector } from "react-redux";

// import { Navigate, useLocation } from "react-router-dom";
// import { selectAuth } from "../features/auth/authSlice";

// const PrivateRoute = ({ children }) => {
//   const location = useLocation();
//   const auth = useSelector(selectAuth);

//   if (!auth?.token) {
//     return <Navigate to="/login" state={{ from: location }} replace />;
//   }

//   return children;
// };

// export default PrivateRoute;
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { selectAuth } from "../features/auth/authSlice";

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const { token } = useSelector(selectAuth);
  //selectAuth: The selector selectAuth is used to retrieve the authentication state from the Redux store, specifically the token.

  if (!token) {
    //The state={{ from: location }}
    //part of the code passes the current location to the login page
    //o after the user logs in
    //they can be (redirected) back to the page they originally tried to access
    return <Navigate to="/axiosLogin" state={{ from: location }} replace />;
  }

  return children; //Home Page
};

export default PrivateRoute;
