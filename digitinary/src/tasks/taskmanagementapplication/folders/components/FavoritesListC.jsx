import React, { useEffect } from "react";
import { useTaskContext } from "../context/TaskContext";
import { Box,  Typography, Paper } from "@mui/material";
import TaskItem from "./taskItem";
import { useNavigate } from "react-router-dom";
import Button from "../../../../reusableComponent/button";
import Icon from "../../../../reusableComponent/lucideReact";  

const ContextFavoritesPage = () => {
  const { state, handleDelete } = useTaskContext(); // From Context API
  const { favorites } = state;
  const navigate = useNavigate();

  useEffect(() => {
    console.log("context render");
  }, [favorites]);

 

  return (
    <Paper elevation={3} sx={{ p: 4, mt: 4, backgroundColor: "#f9f9f9" }}>
      <Typography variant="h4" align="center" fontWeight="bold" gutterBottom>
        Favorite Tasks (Context API)
      </Typography>

      {/* Back button using Icon */}
      <Box mb={2}>
      <Button
          onClick={() => navigate("/taskapplicationmanagement")}
          className="mb-6 flex items-center gap-2 bg-white text-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-50 transition-all duration-300"
        >
          <Icon name="ArrowLeft" size={20} color="#4F46E5" />
          Back to Products
        </Button>
      </Box>

      {favorites.length === 0 ? (
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
            {favorites.map((task) => (
              <TaskItem key={task.id} task={task} handleDelete={handleDelete} />
            ))}
          </ul>
        </>
      )}
    </Paper>
  );
};

export default ContextFavoritesPage;
