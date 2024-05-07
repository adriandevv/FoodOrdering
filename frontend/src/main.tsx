import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { AppRoutes } from "@/AppRoutes";
import "@/global.css";
import { Auth0ProviderWithNAvigate } from "./auth/Auth0ProviderWithNAvigate";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <QueryClientProvider client={queryClient}>
        <Auth0ProviderWithNAvigate>
          <AppRoutes />
        </Auth0ProviderWithNAvigate>
      </QueryClientProvider>
    </Router>
  </React.StrictMode>
);
