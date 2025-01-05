import React, { useEffect } from "react";
import { useTaskContext } from "../context/TaskContext";
import { Box, Button, Typography, Paper } from "@mui/material";
import TaskItem from "./taskItem";

const ContextFavoritesPage = () => {
  const { state, handleDelete } = useTaskContext(); // From Context API
  const { favorites } = state;

  useEffect(() => {
    console.log("context render");
  }, [favorites]);

  return (
    <Paper elevation={3} sx={{ p: 4, mt: 4, backgroundColor: "#f9f9f9" }}>
      <Typography variant="h4" align="center" fontWeight="bold" gutterBottom>
        Favorite Tasks (Context API)
      </Typography>

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
