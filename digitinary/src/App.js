// import React from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { setTask } from "./redux/reducers/taskSlice"; // Import the action from the slice

// function App() {
//   const task = useSelector((state) => state.task.task); // Access Redux state
//   const dispatch = useDispatch(); // To dispatch actions

//   return (
//     <div className="App">
//       <h1>Current Task: {task || "None"}</h1>
//       <button onClick={() => dispatch(setTask(1))}>Set Task 1</button>
//       <button onClick={() => dispatch(setTask(2))}>Set Task 2</button>
//     </div>
//   );
// }

// export default App;
// import React from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { setTask } from "./redux/reducers/taskSlice"; // Import the action from the slice
// import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"; // Import React Router

// import ChatApplication from "./tasks/chatapplication1"; // Ensure you import correctly

// function App() {
//   const task = useSelector((state) => state.task.task); // Access Redux state
//   const dispatch = useDispatch(); // To dispatch actions

//   return (
//     <Router>
//       <div className="App bg-gray-100 min-h-screen flex flex-col items-center">
//         <h1 className="text-4xl font-bold mt-10">
//           {task ? `Current Task: ${task}` : "No Task Selected"}
//         </h1>

//         {/* Navigation */}
//         <nav className="mt-5">
//           <ul className="space-y-3">
//             <li>
//               <button
//                 onClick={() => dispatch(setTask(1))}
//                 className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
//               >
//                 Set Task 1
//               </button>
//             </li>
//             <li>
//               <button
//                 onClick={() => dispatch(setTask(2))}
//                 className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
//               >
//                 Set Task 2
//               </button>
//             </li>
//             {/* Add more tasks as needed */}
//           </ul>
//         </nav>

//         {/* Routing based on Redux state */}
//         <Routes>
//           <Route
//             path="/"
//             element={
//               <h2 className="text-xl mt-5">Select a task to get started</h2>
//             }
//           />{" "}
//           {/* Default route */}
//           <Route path="/chatapplication" element={<ChatApplication />} />{" "}
//           {/* Chat task route */}
//         </Routes>

//         {/* Render current task content */}
//         {task && (
//           <div className="mt-5">
//             <h2 className="text-2xl mb-4">Task {task} is selected</h2>
//             <Link
//               to="/chatapplication"
//               className="px-6 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition"
//             >
//               Go to Chat Application Task
//             </Link>
//           </div>
//         )}
//       </div>
//     </Router>
//   );
// }

// export default App;
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ChatApplication from "./tasks/chatapplication1"; // Your ChatApplication task
import TaskApplicationManagement from "./tasks/taskmanagementapplication"; // Your Task Application
import { useSelector } from "react-redux";

function App() {
  const task = useSelector((state) => state.task.task); // Access Redux state

  return (
    <Router>
      <div className="App">
        {/* Navigation */}
        <nav className="bg-gray-800 p-4">
          <ul className="flex space-x-4 text-white">
            <li>
              <Link to="/chatapplication" className="hover:underline">
                Go To Chat Application
              </Link>
            </li>
            <li>
              <Link to="/taskapplicationmanagement" className="hover:underline">
                Go To Task Application Management
              </Link>
            </li>
          </ul>
        </nav>

        {/* Routing */}
        <Routes>
          <Route
            path="/"
            element={
              <h2 className="text-xl text-center mt-10">
                Welcome to the Application! Please select What You Want Task
                from the navbar.
              </h2>
            }
          />

          <Route path="/chatapplication" element={<ChatApplication />} />
          <Route
            path="/taskapplicationmanagement"
            element={<TaskApplicationManagement />}
          />
        </Routes>

        {/* Render current task content */}
        {task && (
          <div>
            <h2>Task {task} is selected</h2>
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;
