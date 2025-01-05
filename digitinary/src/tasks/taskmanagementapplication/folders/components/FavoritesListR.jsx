import React from "react";
import { useSelector } from "react-redux";
import { Box, Button, Typography, Paper } from "@mui/material";
import TaskItem from "./taskItem";
const ReduxFavoritesPage = () => {
  const reduxFavorites = useSelector((state) => state.tasks.reduxFavorites);

  return (
    <Paper elevation={3} sx={{ p: 4, mt: 4, backgroundColor: "#f9f9f9" }}>
      <Typography variant="h4" align="center" fontWeight="bold" gutterBottom>
        Favorite Tasks (Redux)
      </Typography>

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
