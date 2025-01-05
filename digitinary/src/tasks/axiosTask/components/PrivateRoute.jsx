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

  if (!token) {
    return (
      <Navigate to="/axiosTask/login" state={{ from: location }} replace />
    );
  }

  return children;
};

export default PrivateRoute;
