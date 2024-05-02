import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { AppRoutes } from "@/AppRoutes";
import "@/global.css";
import { Auth0ProviderWithNAvigate } from "./auth/Auth0ProviderWithNAvigate";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <Auth0ProviderWithNAvigate>
        <AppRoutes />
      </Auth0ProviderWithNAvigate>
    </Router>
  </React.StrictMode>
);
