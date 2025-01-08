import React from "react";
import { useSelector } from "react-redux";
import { Box, Typography, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import TaskItem from "./taskItem";
import Icon from "../../../../reusableComponent/lucideReact";
import Button from "../../../../reusableComponent/button";
const ReduxFavoritesPage = () => {
  const navigate = useNavigate();
  const reduxFavorites = useSelector((state) => state.tasks.reduxFavorites);

  return (
    <Paper elevation={3} sx={{ p: 4, mt: 4, backgroundColor: "#f9f9f9" }}>
      <Typography variant="h4" align="center" fontWeight="bold" gutterBottom>
        Favorite Tasks (Redux)
      </Typography>
      <Button
          onClick={() => navigate("/taskapplicationmanagement")}
          className="mb-6 flex items-center gap-2 bg-white text-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-50 transition-all duration-300"
        >
          <Icon name="ArrowLeft" size={20} color="#4F46E5" />
          Back to Products
        </Button>
      {reduxFavorites.length === 0 ? (
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          py={6}
        >
          <Typography variant="body1" color="textSecondary">
            No favorite tasks yet.
          </Typography>
        </Box>
      ) : (
        <>
          <Box mb={4}>
            <Button
              variant="outlined"
              color="secondary"
              sx={{ textTransform: "none", marginBottom: 3 }}
              onClick={() => console.log("Clearing Favorites...")}
            >
              Clear All Favorites
            </Button>
          </Box>
          <ul>
            {reduxFavorites.map((task) => (
              <TaskItem key={task.id} task={task} />
            ))}
          </ul>
        </>
      )}
    </Paper>
  );
};

export default ReduxFavoritesPage;
