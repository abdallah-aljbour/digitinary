import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import ChatApplication from "./tasks/chatapplication1";
import TaskApplicationManagement from "./tasks/taskmanagementapplication";
import FavoritesList from "./tasks/taskmanagementapplication/folders/components/FavoritesList";
import { TaskProvider } from "./tasks/taskmanagementapplication/folders/context/TaskContext";

function App() {
  return (
    <Provider store={store}>
      <TaskProvider>
        <Router>
          <div className="App">
            <nav className="bg-gray-800 p-4">
              <ul className="flex space-x-4 text-white">
                <li>
                  <Link to="/chatapplication" className="hover:underline">
                    Go To Chat Application
                  </Link>
                </li>
                <li>
                  <Link
                    to="/taskapplicationmanagement"
                    className="hover:underline"
                  >
                    Go To Task Application Management
                  </Link>
                </li>
                <li>
                  <Link to="/context-favorites" className="hover:underline">
                    Context Favorites
                  </Link>
                </li>
                <li>
                  <Link to="/redux-favorites" className="hover:underline">
                    Redux Favorites
                  </Link>
                </li>
              </ul>
            </nav>

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
                path="/context-favorites"
                element={<FavoritesList source="context" />}
              />
              <Route
                path="/redux-favorites"
                element={<FavoritesList source="redux" />}
              />
              <Route
                path="/taskapplicationmanagement"
                element={<TaskApplicationManagement />}
              />
            </Routes>
          </div>
        </Router>
      </TaskProvider>
    </Provider>
  );
}

export default App;
