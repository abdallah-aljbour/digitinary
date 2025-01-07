import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, selectAuth } from "../features/auth/authSlice";
import Button from "../../../reusableComponent/button";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector(selectAuth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const authenticatedNavItems = [
    { to: "/", label: "Home" },
    { to: "/chatapplication", label: "Chat Application" },
    { to: "/taskapplicationmanagement", label: "Task Management" },
    { to: "/storeHome", label: "Axios Task" },
  ];

  const publicNavItems = [
    { to: "/", label: "Home" },
    { to: "/storeHome", label: "Axios Task" },
  ];

  const navItems = token ? authenticatedNavItems : publicNavItems;

  // Button styles as props for easy customization
  const navButtonStyles =
    "text-indigo-600 px-4 py-2 rounded-md hover:bg-white/10 transform hover:-translate-y-0.5 transition-all duration-200";
  const authButtonStyles =
    "text-indigo-600 px-4 py-2 rounded-md border border-indigo-600/50 hover:bg-white/10 transform hover:-translate-y-0.5 transition-all duration-200 ml-4";

  return (
    <nav className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 shadow-md backdrop-blur-lg bg-white/70">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Title */}
          <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Company Task Manager
          </h1>

          {/* Navigation Items */}
          <div className="flex items-center gap-2">
            {navItems.map((item) => (
              <Button
                key={item.to}
                as={Link}
                to={item.to}
                className={navButtonStyles}
              >
                {item.label}
              </Button>
            ))}

            {token ? (
              <Button onClick={handleLogout} className={authButtonStyles}>
                Logout
              </Button>
            ) : (
              <Button as={Link} to="/axiosLogin" className={authButtonStyles}>
                Login
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
