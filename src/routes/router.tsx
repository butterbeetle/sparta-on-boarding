import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/common/Layout";
import ProtectedRoute from "../components/common/ProtectedRoute";
import PublicRoute from "../components/common/PublicRoute";
import ErrorBoundary from "../components/ui/ErrorBoundary";
import HomePage from "../pages/HomePage/HomePage";
import LoginPage from "../pages/LoginPage/LoginPage";
import MyPage from "../pages/MyPage/MyPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";

const ProtectedRouteWrapper = ({ element }: { element: JSX.Element }) => (
  <ProtectedRoute>
    <ErrorBoundary>{element}</ErrorBoundary>
  </ProtectedRoute>
);

const PublicRouteWrapper = ({ element }: { element: JSX.Element }) => (
  <PublicRoute>
    <ErrorBoundary>{element}</ErrorBoundary>
  </PublicRoute>
);

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/login",
        element: <PublicRouteWrapper element={<LoginPage />} />,
      },
      {
        path: "/signup",
        element: <PublicRouteWrapper element={<SignUpPage />} />,
      },
      {
        path: "/my",
        element: <ProtectedRouteWrapper element={<MyPage />} />,
      },
    ],
  },
]);

export default router;
