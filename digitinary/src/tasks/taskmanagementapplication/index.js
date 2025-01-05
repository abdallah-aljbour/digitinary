import React from "react";
import { TaskProvider } from ".//folders/context/TaskContext";
import TaskList from "./folders/components/taskList";
import TaskForm from "./folders/components/taskForm";

const TaskApplicationManagement = () => {
  return (
    <TaskProvider>
      <div className="App">
        <TaskForm />
        <TaskList />
      </div>
    </TaskProvider>
  );
};

export default TaskApplicationManagement;
