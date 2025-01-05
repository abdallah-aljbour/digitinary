import React from "react";
import { Typography, List, ListItem, ListItemText, Paper } from "@mui/material";

const UserList = ({ users }) => {
  return (
    <Paper
      sx={{
        padding: 2,
        backgroundColor: "#f5f5f5",
        borderRadius: 2,
        boxShadow: 1,
      }}
    >
      <Typography variant="h6" gutterBottom>
        Active Users
      </Typography>
      <List>
        {users.map((user) => (
          <ListItem
            key={user.id}
            sx={{ backgroundColor: "white", borderRadius: 1, marginBottom: 1 }}
          >
            <ListItemText primary={user.name} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default UserList;
