import React from "react";
import { TaskProvider } from ".//folders/context/TaskContext";
import TaskList from "./folders/components/taskList";
import TaskForm from "./folders/components/taskForm";

const TaskApplicationManagement = () => {
  return (
    <TaskProvider>
      <div className="App">
        <h1 className="text-4xl font-semibold text-center mt-8">
          Task Management
        </h1>
        <TaskForm />
        <TaskList />
      </div>
    </TaskProvider>
  );
};

export default TaskApplicationManagement;
