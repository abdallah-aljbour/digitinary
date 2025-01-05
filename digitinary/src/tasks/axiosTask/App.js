// import React from "react";
// import { Provider } from "react-redux";
// import { PersistGate } from "redux-persist/integration/react";
// import { Routes, Route, Navigate } from "react-router-dom";
// import { store, persistor } from "./app/store";
// import Register from "./components/RegisterPage";
// import Login from "./components/Login";
// import PrivateRoute from "./components/PrivateRoute";
// import HomePage from "./components/HomePage";
// import { Box, Container } from "@mui/material";

// const AxiosTask = () => {
//   return (
//     <Provider store={store}>
//       <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
//         <Container maxWidth="md">
//           <Box sx={{ padding: "20px" }}>
//             <Routes>
//               <Route path="/" element={<Navigate to="login" replace />} />
//               <Route path="login" element={<Login />} />
//               <Route path="register" element={<Register />} />
//               <Route
//                 path="home"
//                 element={
//                   <PrivateRoute>
//                     <HomePage />
//                   </PrivateRoute>
//                 }
//               />
//             </Routes>
//           </Box>
//         </Container>
//       </PersistGate>
//     </Provider>
//   );
// };

// export default AxiosTask;
import React from "react";
import { PersistGate } from "redux-persist/integration/react";
import { Routes, Route, Navigate } from "react-router-dom";
import { store, persistor } from "./app/store";
import { Provider } from "react-redux";
import Register from "./components/RegisterPage";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import HomePage from "./components/HomePage";
import { Box, Container } from "@mui/material";

const AxiosTask = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
        <Container maxWidth="md">
          <Box sx={{ padding: "20px" }}>
            <Routes>
              <Route path="/" element={<Navigate to="login" replace />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route
                path="home"
                element={
                  <PrivateRoute>
                    <HomePage />
                  </PrivateRoute>
                }
              />
            </Routes>
          </Box>
        </Container>
      </PersistGate>
    </Provider>
  );
};

export default AxiosTask;
