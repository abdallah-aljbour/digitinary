import React, { useState } from "react";
import { useTaskContext } from "../context/TaskContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  TextareaAutosize,
} from "@mui/material";
import {
  validateTaskName,
  validateDueDate,
  validatePriority,
  validateDescription,
} from "../utils/validation";

const TaskForm = () => {
  const { dispatch } = useTaskContext();
  const [taskName, setTaskName] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("Low");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({});
  const [touchedFields, setTouchedFields] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validate single field
  const validateField = (fieldName, value) => {
    let error = "";
    switch (fieldName) {
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

  // Handle field changes
  const handleFieldChange = (fieldName, value) => {
    // Update the field value
    switch (fieldName) {
      case "taskName":
        setTaskName(value);
        break;
      case "dueDate":
        setDueDate(value);
        break;
      case "priority":
        setPriority(value);
        break;
      case "description":
        setDescription(value);
        break;
      default:
        break;
    }

    // Mark field as touched
    setTouchedFields((prev) => ({
      ...prev,
      [fieldName]: true,
    }));

    // Only validate if field has been touched
    const error = validateField(fieldName, value);
    setErrors((prev) => ({
      ...prev,
      [fieldName]: error,
    }));
  };

  // Validate all fields
  const validateForm = () => {
    const formErrors = {
      taskName: validateTaskName(taskName),
      dueDate: validateDueDate(dueDate),
      priority: validatePriority(priority),
      description: validateDescription(description),
    };

    setErrors(formErrors);
    return !Object.values(formErrors).some((error) => error !== "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Mark all fields as touched
    setTouchedFields({
      taskName: true,
      dueDate: true,
      priority: true,
      description: true,
    });

    if (validateForm()) {
      // Create task preview
      const taskPreview = `
        Task: ${taskName}
        Due: ${new Date(dueDate).toLocaleDateString()}
        Priority: ${priority}
      `;

      // Show confirmation toast with task preview
      toast.info(
        <div className="confirmation-dialog">
          <h4 className="text-lg font-semibold mb-2">Confirm Task Creation</h4>
          <pre className="whitespace-pre-wrap text-sm bg-gray-50 p-2 rounded mb-3">
            {taskPreview}
          </pre>
          <p className="mb-3">Are you sure you want to create this task?</p>
          <div className="flex gap-2 justify-end">
            <Button
              onClick={() => {
                toast.dismiss();
                setIsSubmitting(false);
              }}
              variant="outlined"
              color="secondary"
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirmSubmit}
              variant="contained"
              color="primary"
            >
              Confirm
            </Button>
          </div>
        </div>,
        {
          position: "top-center",
          autoClose: false,
          closeOnClick: false,
          draggable: false,
          closeButton: false,
          className: "confirm-toast",
          style: { minWidth: "320px" },
        }
      );
    } else {
      toast.error("Please fix the errors in the form", {
        position: "top-right",
        autoClose: 3000,
      });
      setIsSubmitting(false);
    }
  };

  const handleConfirmSubmit = () => {
    try {
      const newTask = {
        id: Date.now(),
        taskName,
        dueDate,
        priority,
        description,
        createdAt: new Date().toISOString(),
        status: "pending",
      };

      dispatch({ type: "ADD_TASK", payload: newTask });

      // Dismiss confirmation toast
      toast.dismiss();

      // Show success toast
      toast.success("✅ Task created successfully!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
      });

      // Reset form
      setTaskName("");
      setDueDate("");
      setPriority("Low");
      setDescription("");
      setErrors({});
      setTouchedFields({});
    } catch (error) {
      toast.error("Failed to create task. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Check if form is valid
  const isFormValid =
    taskName &&
    dueDate &&
    priority &&
    !Object.values(errors).some((error) => error !== "") &&
    Object.keys(touchedFields).length >= 3;

  return (
    <>
      <div className="task-form max-w-2xl mx-auto p-4 bg-white shadow-lg rounded-md">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Add a New Task
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Task Name */}
          <TextField
            fullWidth
            label="Task Name"
            variant="outlined"
            value={taskName}
            onChange={(e) => handleFieldChange("taskName", e.target.value)}
            onBlur={() => handleFieldChange("taskName", taskName)}
            error={touchedFields.taskName && errors.taskName}
            helperText={touchedFields.taskName && errors.taskName}
            disabled={isSubmitting}
          />

          {/* Due Date */}
          <TextField
            fullWidth
            label="Due Date"
            variant="outlined"
            type="date"
            value={dueDate}
            onChange={(e) => handleFieldChange("dueDate", e.target.value)}
            onBlur={() => handleFieldChange("dueDate", dueDate)}
            error={touchedFields.dueDate && errors.dueDate}
            helperText={touchedFields.dueDate && errors.dueDate}
            disabled={isSubmitting}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              min: new Date().toISOString().split("T")[0],
            }}
          />

          {/* Priority */}
          <FormControl fullWidth variant="outlined">
            <InputLabel>Priority</InputLabel>
            <Select
              label="Priority"
              value={priority}
              onChange={(e) => handleFieldChange("priority", e.target.value)}
              onBlur={() => handleFieldChange("priority", priority)}
              error={touchedFields.priority && errors.priority}
              disabled={isSubmitting}
            >
              <MenuItem value="Low">Low</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="High">High</MenuItem>
            </Select>
            {touchedFields.priority && errors.priority && (
              <p className="text-red-500 text-sm mt-1">{errors.priority}</p>
            )}
          </FormControl>

          {/* Description */}
          <TextareaAutosize
            minRows={4}
            placeholder="Enter task description (optional)"
            value={description}
            onChange={(e) => handleFieldChange("description", e.target.value)}
            onBlur={() => handleFieldChange("description", description)}
            disabled={isSubmitting}
            maxLength={200}
            style={{ width: "100%", padding: "12px", borderRadius: "4px" }}
          />
          <div className="flex justify-between mt-1">
            {touchedFields.description && errors.description && (
              <p className="text-red-500 text-sm">{errors.description}</p>
            )}
            <p className="text-gray-500 text-sm ml-auto">
              {description.length}/200 characters
            </p>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={!isFormValid || isSubmitting}
          >
            {isSubmitting ? "Creating Task..." : "Create Task"}
          </Button>
        </form>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default TaskForm;
