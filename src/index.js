import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GoogleOAuthProvider } from "@react-oauth/google";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <GoogleOAuthProvider clientId="819854252013-t5t6kqc8or1kiop8bd5dsqumc4upq1q2.apps.googleusercontent.com">
    <React.StrictMode>
      <App />
      <ToastContainer />
    </React.StrictMode>
  </GoogleOAuthProvider>
);
