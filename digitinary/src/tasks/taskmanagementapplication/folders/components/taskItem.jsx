import React, { useState } from "react";
import { useTaskContext } from "../context/TaskContext";
import { useDispatch, useSelector } from "react-redux";
import {
  addToReduxFavorites,
  removeFromReduxFavorites,
  editFavorite,
} from "../../../../redux/reducers/taskSlice";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import {
  validateTaskName,
  validateDueDate,
  validatePriority,
  validateDescription,
} from "../utils/validation";

const TaskItem = ({ task }) => {
  const { dispatch: contextDispatch, state: contextState } = useTaskContext();
  const reduxDispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({ ...task });
  const [showFavoriteOptions, setShowFavoriteOptions] = useState(false);
  const [errors, setErrors] = useState({});
  const location = useLocation();

  const reduxFavorites = useSelector((state) => state.tasks.reduxFavorites);

  const isInFavorites = location.pathname.includes("favorites");

  const isContextFavorite = contextState.favorites.some(
    (favTask) => favTask.id === task.id
  );

  const isReduxFavorite = reduxFavorites.some(
    (favTask) => favTask.id === task.id
  );

  const handleDelete = () => {
    contextDispatch({ type: "DELETE_TASK", payload: task.id });
    if (isReduxFavorite) {
      reduxDispatch(removeFromReduxFavorites(task.id));
    }
    toast.success("Task deleted successfully!");
  };

  const handleFavoriteToggle = () => {
    setShowFavoriteOptions(!showFavoriteOptions);
  };

  const handleContextFavorite = () => {
    if (isContextFavorite) {
      contextDispatch({ type: "REMOVE_FROM_FAVORITES", payload: task.id });
      toast.info("Removed from Context favorites");
    } else {
      contextDispatch({ type: "ADD_TO_FAVORITES", payload: task });
      toast.success("Added to Context favorites");
    }
    setShowFavoriteOptions(false);
  };

  const handleReduxFavorite = () => {
    if (isReduxFavorite) {
      reduxDispatch(removeFromReduxFavorites(task.id));
      toast.info("Removed from Redux favorites");
    } else {
      // If task is being added to favorites, we can also check if it's being edited
      if (isEditing) {
        // Assuming 'task' is updated, e.g., name or description changed
        const updatedTask = {
          ...task,
          name: "Updated Task Name", // Example of task update
          description: "Updated Description", // Example of task update
        };

        reduxDispatch(editFavorite(updatedTask)); // Dispatch editFavorite
        toast.success("Task updated in Redux favorites");
      } else {
        reduxDispatch(addToReduxFavorites(task)); // Add task to favorites
        toast.success("Added to Redux favorites");
      }
    }
    setShowFavoriteOptions(false);
  };

  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "taskName":
        error = validateTaskName(value);
        break;
      case "dueDate":
        error = validateDueDate(value);
        break;
      case "priority":
        error = validatePriority(value);
        break;
      case "description":
        error = validateDescription(value);
        break;
      default:
        break;
    }
    return error;
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedTask({ ...editedTask, [name]: value });

    const error = validateField(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const isFormValid = () => {
    return (
      editedTask.taskName &&
      editedTask.dueDate &&
      editedTask.priority &&
      Object.values(errors).every((error) => !error)
    );
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();

    const newErrors = {
      taskName: validateTaskName(editedTask.taskName),
      dueDate: validateDueDate(editedTask.dueDate),
      priority: validatePriority(editedTask.priority),
      description: validateDescription(editedTask.description),
    };

    setErrors(newErrors);

    if (Object.values(newErrors).every((error) => !error)) {
      contextDispatch({ type: "EDIT_TASK", payload: editedTask });
      setIsEditing(false);
      toast.success("Task updated successfully!");
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedTask({ ...task });
    setErrors({});
  };

  if (isEditing && !isInFavorites) {
    return (
      <li className="task-item p-4 bg-white shadow-lg rounded-md">
        <form onSubmit={handleEditSubmit} className="space-y-4">
          <div>
            <label htmlFor="taskName" className="block text-lg font-medium">
              Task Name
            </label>
            <input
              type="text"
              id="taskName"
              name="taskName"
              value={editedTask.taskName}
              onChange={handleEditChange}
              className={`w-full p-3 border rounded-md ${
                errors.taskName ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.taskName && (
              <p className="text-red-500 text-sm mt-1">{errors.taskName}</p>
            )}
          </div>

          <div>
            <label htmlFor="dueDate" className="block text-lg font-medium">
              Due Date
            </label>
            <input
              type="date"
              id="dueDate"
              name="dueDate"
              value={editedTask.dueDate}
              onChange={handleEditChange}
              className={`w-full p-3 border rounded-md ${
                errors.dueDate ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.dueDate && (
              <p className="text-red-500 text-sm mt-1">{errors.dueDate}</p>
            )}
          </div>

          <div>
            <label htmlFor="priority" className="block text-lg font-medium">
              Priority
            </label>
            <select
              id="priority"
              name="priority"
              value={editedTask.priority}
              onChange={handleEditChange}
              className={`w-full p-3 border rounded-md ${
                errors.priority ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select Priority</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
            {errors.priority && (
              <p className="text-red-500 text-sm mt-1">{errors.priority}</p>
            )}
          </div>

          <div>
            <label htmlFor="description" className="block text-lg font-medium">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={editedTask.description}
              onChange={handleEditChange}
              rows="3"
              maxLength="200"
              className={`w-full p-3 border rounded-md resize-none ${
                errors.description ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description}</p>
            )}
            <p className="text-gray-500 text-sm mt-1">
              {editedTask.description.length}/200 characters
            </p>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!isFormValid()}
              className={`px-4 py-2 rounded-md ${
                isFormValid()
                  ? "bg-blue-500 hover:bg-blue-600 text-white"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              Save Changes
            </button>
          </div>
        </form>
      </li>
    );
  }

  return (
    <li className="task-item p-4 bg-white shadow-lg rounded-md relative">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-xl font-semibold mb-2">{task.taskName}</h3>
          <p className="text-gray-600 mb-2">Due Date: {task.dueDate}</p>
          <p
            className={`inline-block px-3 py-1 rounded-full text-sm ${
              task.priority === "High"
                ? "bg-red-100 text-red-800"
                : task.priority === "Medium"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-green-100 text-green-800"
            }`}
          >
            {task.priority}
          </p>
        </div>
        <div className="relative">
          <button
            onClick={handleFavoriteToggle}
            className={`p-2 rounded-full transition-colors duration-200 ${
              isContextFavorite || isReduxFavorite
                ? "bg-pink-500 hover:bg-pink-600 text-white"
                : "bg-gray-200 hover:bg-gray-300 text-gray-600"
            }`}
          >
            {isContextFavorite || isReduxFavorite ? "★" : "☆"}
          </button>

          {showFavoriteOptions && (
            <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
              <div className="py-1">
                <button
                  onClick={handleContextFavorite}
                  className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 flex items-center justify-between"
                >
                  <span>
                    {isContextFavorite
                      ? "Remove from Context"
                      : "Add to Context"}
                  </span>
                  {isContextFavorite && (
                    <span className="text-sm text-gray-500">★</span>
                  )}
                </button>
                <button
                  onClick={handleReduxFavorite}
                  className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 flex items-center justify-between"
                >
                  <span>
                    {isReduxFavorite ? "Remove from Redux" : "Add to Redux"}
                  </span>
                  {isReduxFavorite && (
                    <span className="text-sm text-gray-500">★</span>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-between items-center">
        <button
          onClick={() => setIsEditing(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default TaskItem;
