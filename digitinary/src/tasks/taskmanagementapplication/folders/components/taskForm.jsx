// TaskForm.jsx
import React, { useState } from "react";
import { useTaskContext } from "../context/TaskContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useFormValidation from "../../../../reusableComponent/formValidationHook";
import FormInput from "../../../../reusableComponent/formInput";
import Button from "../../../../reusableComponent/button";

const TaskForm = () => {
  const { dispatch } = useTaskContext();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initial form state
  const initialState = {
    taskName: "",
    dueDate: "",
    priority: "Low",
    description: "",
  };

  // Validation rules
  const validationRules = {
    taskName: [
      (value) => (!value?.trim() ? "Task name is required" : ""),
      (value) => (value?.trim().length < 3 ? "Task name must be at least 3 characters" : ""),
      (value) => (value?.trim().length > 50 ? "Task name cannot exceed 50 characters" : ""),
    ],
    dueDate: [
      (value) => (!value ? "Due date is required" : ""),
      (value) => {
        const selectedDate = new Date(value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return selectedDate < today ? "Due date cannot be in the past" : "";
      },
    ],
    priority: [
      (value) => (!value ? "Priority is required" : ""),
      (value) => (!["Low", "Medium", "High"].includes(value) ? "Invalid priority level" : ""),
    ],
    description: [
      (value) => (value?.length > 200 ? "Description cannot exceed 200 characters" : ""),
    ],
  };

  const {
    formData,
    formErrors,
    handleChange,
    setFormData,
    hasErrors,
  } = useFormValidation(initialState, validationRules);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!hasErrors() && Object.values(formData).some(Boolean)) {
      // Create task preview
      const taskPreview = `
        Task: ${formData.taskName}
        Due: ${new Date(formData.dueDate).toLocaleDateString()}
        Priority: ${formData.priority}
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
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirmSubmit}
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700"
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
        ...formData,
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
      setFormData(initialState);
    } catch (error) {
      toast.error("Failed to create task. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const priorityOptions = [
    { value: "Low", label: "Low" },
    { value: "Medium", label: "Medium" },
    { value: "High", label: "High" },
  ];

  // Check if form is valid
  const isFormValid =
    formData.taskName &&
    formData.dueDate &&
    formData.priority &&
    !hasErrors();

  return (
    <>
      <div className="task-form max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
          Add a New Task
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormInput
            name="taskName"
            label="Task Name"
            value={formData.taskName}
            onChange={handleChange}
            error={formErrors.taskName}
            required
          />

          <FormInput
            name="dueDate"
            label="Due Date"
            type="date"
            value={formData.dueDate}
            onChange={handleChange}
            error={formErrors.dueDate}
            required
          />

          <FormInput
            name="priority"
            label="Priority"
            type="select"
            value={formData.priority}
            onChange={handleChange}
            error={formErrors.priority}
            options={priorityOptions}
            required
          />

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 
                ${formErrors.description ? "border-red-500" : "border-gray-300"}`}
              maxLength={200}
            />
            <div className="flex justify-between mt-1">
              {formErrors.description && (
                <p className="text-sm text-red-500">{formErrors.description}</p>
              )}
              <p className="text-sm text-gray-500">
                {formData.description.length}/200 characters
              </p>
            </div>
          </div>

          <Button
            type="submit"
            disabled={!isFormValid || isSubmitting}
            className={`w-full px-4 py-2 text-sm font-medium text-white rounded-md
              ${
                !isFormValid || isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700"
              }`}
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

