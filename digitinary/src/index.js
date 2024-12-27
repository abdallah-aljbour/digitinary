import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals"; // "function runs automatically and sends performance data to an analytics service (e.g., Google Analytics) or logs it to the console" It helps monitor and improve the performance of your React app
import { Provider } from "react-redux";
import store from "./redux/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
reportWebVitals();

//  <React.StrictMode>  : It is a (development-only tool) that helps you identify potential problems in your app during development

//reportWebVitals: Used to measure performance, but optional.
//React.StrictMode: A development tool for detecting potential problems in your code.
//<Provider>: Makes the Redux store available to the whole app.
