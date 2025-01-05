// import React, { useMemo } from "react";
// import { useTaskContext } from "../context/TaskContext";
// import TaskItem from "./taskItem";
// import TaskSort from "./filterSort";
// import TaskFilter from "./TaskFilter";

// const TaskList = () => {
//   const { state } = useTaskContext();
//   const { tasks, priorityFilter, dueDateFilter, sortField, sortOrder } = state;

//   const filteredAndSortedTasks = useMemo(() => {
//     // First apply filters
//     let filteredTasks = [...tasks];

//     // Apply priority filter
//     if (priorityFilter) {
//       filteredTasks = filteredTasks.filter(
//         (task) => task.priority === priorityFilter
//       );
//     }

//     // Apply due date filter
//     if (dueDateFilter) {
//       const today = new Date();
//       today.setHours(0, 0, 0, 0);
//       const in7Days = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);

//       filteredTasks = filteredTasks.filter((task) => {
//         const taskDate = new Date(task.dueDate);
//         taskDate.setHours(0, 0, 0, 0);

//         if (dueDateFilter === "overdue") {
//           return taskDate < today;
//         } else if (dueDateFilter === "next7days") {
//           return taskDate >= today && taskDate <= in7Days;
//         }
//         return true;
//       });
//     }

//     // Then apply sorting
//     if (sortField) {
//       filteredTasks.sort((a, b) => {
//         if (sortField === "priority") {
//           const priorityOrder = { Low: 1, Medium: 2, High: 3 };
//           const comparison =
//             priorityOrder[a.priority] - priorityOrder[b.priority];
//           return sortOrder === "asc" ? comparison : -comparison;
//         } else if (sortField === "dueDate") {
//           const comparison = new Date(a.dueDate) - new Date(b.dueDate);
//           return sortOrder === "asc" ? comparison : -comparison;
//         }
//         return 0;
//       });
//     }

//     return filteredTasks;
//   }, [tasks, priorityFilter, dueDateFilter, sortField, sortOrder]);

//   return (
//     <div className="task-list mt-8 p-4 bg-white shadow rounded">
//       {tasks.length > 0 ? (
//         <>
//           <div className="mb-6 space-y-4">
//             <TaskFilter />
//             <TaskSort />
//           </div>
//           <h2 className="text-2xl font-semibold mb-4">Task List</h2>
//           {filteredAndSortedTasks.length > 0 ? (
//             <ul className="space-y-4">
//               {filteredAndSortedTasks.map((task) => (
//                 <TaskItem key={task.id} task={task} />
//               ))}
//             </ul>
//           ) : (
//             <div className="text-center p-4 text-gray-500">
//               <p>No tasks match the current filters.</p>
//             </div>
//           )}
//         </>
//       ) : (
//         <div className="text-center p-4 text-gray-500">
//           <h2 className="text-xl font-semibold mb-2">No tasks available.</h2>
//           <p className="text-sm">Add a task to get started.</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TaskList;
import React, { useState } from "react";
import { useMemo } from "react";
import { useTaskContext } from "../context/TaskContext";
import TaskItem from "./taskItem";
import TaskSort from "./filterSort";
import TaskFilter from "./TaskFilter";
import { Link } from "react-router-dom";
import { Button, Typography, Box, Paper, Menu, MenuItem } from "@mui/material";

const TaskList = () => {
  const { state } = useTaskContext();
  const { tasks, priorityFilter, dueDateFilter, sortField, sortOrder } = state;

  // State to manage dropdown menu
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget); // Open the menu
  };

  const handleMenuClose = () => {
    setAnchorEl(null); // Close the menu
  };

  const filteredAndSortedTasks = useMemo(() => {
    let filteredTasks = [...tasks];

    if (priorityFilter) {
      filteredTasks = filteredTasks.filter(
        (task) => task.priority === priorityFilter
      );
    }

    if (dueDateFilter) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const in7Days = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);

      filteredTasks = filteredTasks.filter((task) => {
        const taskDate = new Date(task.dueDate);
        taskDate.setHours(0, 0, 0, 0);

        if (dueDateFilter === "overdue") {
          return taskDate < today;
        } else if (dueDateFilter === "next7days") {
          return taskDate >= today && taskDate <= in7Days;
        }
        return true;
      });
    }

    if (sortField) {
      filteredTasks.sort((a, b) => {
        if (sortField === "priority") {
          const priorityOrder = { Low: 1, Medium: 2, High: 3 };
          const comparison =
            priorityOrder[a.priority] - priorityOrder[b.priority];
          return sortOrder === "asc" ? comparison : -comparison;
        } else if (sortField === "dueDate") {
          const comparison = new Date(a.dueDate) - new Date(b.dueDate);
          return sortOrder === "asc" ? comparison : -comparison;
        }
        return 0;
      });
    }

    return filteredTasks;
  }, [tasks, priorityFilter, dueDateFilter, sortField, sortOrder]);

  return (
    <Paper elevation={3} sx={{ p: 4, mt: 2 }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
      >
        <Typography variant="h5" fontWeight="bold">
          Task List
        </Typography>
        {/* Dropdown button for "View Favorites" */}
        <Button
          variant="contained"
          color="secondary"
          sx={{ textTransform: "none" }}
          onClick={handleMenuClick}
        >
          View Favorites
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem
            component={Link}
            to="/context-favorites"
            onClick={handleMenuClose}
          >
            Context Favorites
          </MenuItem>
          <MenuItem
            component={Link}
            to="/redux-favorites"
            onClick={handleMenuClose}
          >
            Redux Favorites
          </MenuItem>
        </Menu>
      </Box>

      {tasks.length > 0 ? (
        <>
          <Box mb={4}>
            <TaskFilter />
            <TaskSort />
          </Box>
          {filteredAndSortedTasks.length > 0 ? (
            <ul>
              {filteredAndSortedTasks.map((task) => (
                <TaskItem key={task.id} task={task} />
              ))}
            </ul>
          ) : (
            <Typography variant="body2" color="textSecondary" align="center">
              No tasks match the current filters.
            </Typography>
          )}
        </>
      ) : (
        <Box display="flex" flexDirection="column" alignItems="center" p={4}>
          <Typography variant="h6" fontWeight="bold" mb={2}>
            No tasks available.
          </Typography>
          <Typography variant="body2">Add a task to get started.</Typography>
        </Box>
      )}
    </Paper>
  );
};

export default TaskList;
