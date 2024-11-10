import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/common/Layout";
import ProtectedRoute from "../components/common/ProtectedRoute";
import PublicRoute from "../components/common/PublicRoute";
import HomePage from "../pages/HomePage/HomePage";
import LoginPage from "../pages/LoginPage/LoginPage";
import MyPage from "../pages/MyPage/MyPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";

const ProtectedRouteWrapper = ({ element }: { element: JSX.Element }) => (
  <ProtectedRoute>{element}</ProtectedRoute>
);

const PublicRouteWrapper = ({ element }: { element: JSX.Element }) => (
  <PublicRoute>{element}</PublicRoute>
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
