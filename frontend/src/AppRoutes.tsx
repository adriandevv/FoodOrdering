import { Routes, Route } from "react-router-dom";
import { Home } from "@/components/Home";
import { Layout } from "@/layouts/Layout";
export const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <Home />
          </Layout>
        }
      />
    </Routes>
  );
};
