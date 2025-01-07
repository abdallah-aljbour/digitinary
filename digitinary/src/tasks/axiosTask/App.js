// import React from "react";

// import { Routes, Route, Navigate } from "react-router-dom";

// import Register from "./components/RegisterPage";
// import Login from "./components/Login";
// import PrivateRoute from "./components/PrivateRoute";

// import ProductDetails from "./components/ProductDetails";
// import { Box, Container } from "@mui/material";

// const AxiosTask = () => {
//   return (
//     <Container maxWidth="lg">
//       <Box sx={{ padding: "20px" }}>
//         <Routes>
//           <Route path="/" element={<Navigate to="login" replace />} />
//           <Route path="login" element={<Login />} />
//           <Route path="register" element={<Register />} />

//           <Route
//             path="/home/product/:id"
//             element={
//               <PrivateRoute>
//                 <ProductDetails />
//               </PrivateRoute>
//             }
//           />
//           <Route path="*" element={<Navigate to="login" replace />} />
//         </Routes>
//       </Box>
//     </Container>
//   );
// };

// export default AxiosTask;
