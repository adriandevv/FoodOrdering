import { Routes, Route } from "react-router-dom";

import { Layout } from "@/layouts/Layout";
import { HomePage } from "./pages/HomePage";
import { AuthCallbackPage } from "./pages/AuthCallbackPage";
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
      <Route path="/auth-callback" element={<AuthCallbackPage/>} />
      <Route path="*" element={<div>Not Found</div>} />
    </Routes>
  );
};
