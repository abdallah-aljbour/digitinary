import React from "react";
import { useTaskContext } from "../context/TaskContext";
import { useSelector } from "react-redux"; // Import Redux selector
import TaskItem from "./taskItem";

const FavoritesList = ({ source }) => {
  const { state } = useTaskContext(); // From Context API
  const { favorites } = state;

  const reduxFavorites = useSelector((state) => {
    console.log("Accessing Redux State: reduxFavorites"); // Log Redux access
    return state.tasks.reduxFavorites;
  });

  // Choose the source of favorites based on the `source` prop
  const favoritesList = source === "redux" ? reduxFavorites : favorites;

  if (source !== "redux") {
    console.log("Accessing Context State: favorites"); // Log Context access
  }

  return (
    <div className="favorites-list mt-8 p-4 bg-white shadow rounded">
      <h2 className="text-2xl font-semibold mb-4">Favorite Tasks</h2>
      {favoritesList.length > 0 ? (
        <ul className="space-y-4">
          {favoritesList.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </ul>
      ) : (
        <div className="text-center p-4 text-gray-500">
          <p>No favorite tasks yet.</p>
          <p className="text-sm">Add tasks to favorites to see them here.</p>
        </div>
      )}
    </div>
  );
};

export default FavoritesList;
