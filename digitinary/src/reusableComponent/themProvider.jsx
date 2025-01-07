// ThemeProvider.js
import React from "react";

const ThemeProvider = ({ children }) => {
  return (
    <div className="bg-gradient-to-br from-primary via-secondary to-accent">
      {children}
    </div>
  );
};

export default ThemeProvider;
