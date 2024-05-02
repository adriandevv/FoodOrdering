import { Routes, Route } from "react-router-dom";

import { Layout } from "@/layouts/Layout";
import { HomePage } from "./pages/HomePage";
export const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <HomePage />
          </Layout>
        }
      />
    </Routes>
  );
};
