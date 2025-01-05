// import React from "react";
// import {
//   Box,
//   Paper,
//   Typography,
//   List,
//   ListItem,
//   ListItemText,
//   Slider,
//   Button,
//   Divider,
// } from "@mui/material";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   setCategoryFilter,
//   setPriceRange,
//   clearFilters,
//   selectFilters,
// } from "../features/products/productSlice";

// const categories = [
//   { id: "all", name: "All Categories" },
//   { id: "Clothes", name: "Clothes" },
//   { id: "Electronics", name: "Electronics" },
//   { id: "Furniture", name: "Furniture" },
//   { id: "Shoes", name: "Shoes" },
//   { id: "Miscellaneous", name: "Miscellaneous" },
// ];

// const Sidebar = () => {
//   const dispatch = useDispatch();
//   const filters = useSelector(selectFilters);

//   const handleCategoryClick = (categoryId) => {
//     dispatch(setCategoryFilter(categoryId));
//   };

//   const handlePriceChange = (event, newValue) => {
//     dispatch(setPriceRange({ min: newValue[0], max: newValue[1] }));
//   };

//   return (
//     <Paper
//       sx={{
//         p: 2,
//         height: "100%",
//         borderRadius: "12px",
//         background: "linear-gradient(145deg, #f6f8fc 0%, #ffffff 100%)",
//         boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
//       }}
//     >
//       <Typography
//         variant="h6"
//         sx={{ mb: 2, color: "#1a237e", fontWeight: 600 }}
//       >
//         Filters
//       </Typography>

//       {/* Categories Section */}
//       <Typography variant="subtitle1" sx={{ mb: 1 }}>
//         Categories
//       </Typography>
//       <List sx={{ mb: 3 }}>
//         {categories.map((category) => (
//           <ListItem
//             button
//             key={category.id}
//             selected={filters.category === category.id}
//             onClick={() => handleCategoryClick(category.id)}
//             sx={{
//               borderRadius: "8px",
//               mb: 0.5,
//               "&.Mui-selected": {
//                 backgroundColor: "rgba(26, 35, 126, 0.1)",
//                 "&:hover": {
//                   backgroundColor: "rgba(26, 35, 126, 0.2)",
//                 },
//               },
//             }}
//           >
//             <ListItemText primary={category.name} />
//           </ListItem>
//         ))}
//       </List>

//       <Divider sx={{ my: 2 }} />

//       {/* Price Range Section */}
//       <Typography variant="subtitle1" sx={{ mb: 1 }}>
//         Price Range
//       </Typography>
//       <Box sx={{ px: 2, mb: 3 }}>
//         <Slider
//           value={[
//             filters.priceRange.min,
//             filters.priceRange.max === Infinity ? 1000 : filters.priceRange.max,
//           ]}
//           onChange={handlePriceChange}
//           valueLabelDisplay="auto"
//           min={0}
//           max={1000}
//           sx={{
//             color: "#1a237e",
//           }}
//         />
//         <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
//           <Typography variant="body2">${filters.priceRange.min}</Typography>
//           <Typography variant="body2">
//             $
//             {filters.priceRange.max === Infinity
//               ? "1000+"
//               : filters.priceRange.max}
//           </Typography>
//         </Box>
//       </Box>

//       {/* Clear Filters Button */}
//       <Button
//         fullWidth
//         variant="outlined"
//         onClick={() => dispatch(clearFilters())}
//         sx={{
//           borderColor: "#1a237e",
//           color: "#1a237e",
//           "&:hover": {
//             borderColor: "#0d1b60",
//             backgroundColor: "rgba(26, 35, 126, 0.1)",
//           },
//         }}
//       >
//         Clear Filters
//       </Button>
//     </Paper>
//   );
// };

// export default Sidebar;
