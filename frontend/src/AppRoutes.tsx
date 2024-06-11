import { Routes, Route } from "react-router-dom";
import { UserProfilePage } from "./pages/UserProfilePage";
import { Layout } from "@/layouts/Layout";
import { HomePage } from "./pages/HomePage";
import { AuthCallbackPage } from "./pages/AuthCallbackPage";
import { ProtectedRoute } from "./auth/ProtectedRoute";
import { ManageRestaurantPage } from "./pages/ManageRestaurantPage";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout showHero={true}>
            <HomePage />
          </Layout>
        }
      />
      <Route path="/auth-callback" element={<AuthCallbackPage />} />
      <Route element={<ProtectedRoute />}>
        <Route
          path="/user-profile"
          element={
            <Layout>
              <UserProfilePage />
            </Layout>
          }
        />
                <Route
          path="/manage-restaurant"
          element={
            <Layout>
              <ManageRestaurantPage/>
            </Layout>
          }
        />
      </Route>
      <Route path="*" element={<div>Not Found</div>} />
    </Routes>
  );
};
