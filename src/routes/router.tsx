import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/common/Layout";
import HomePage from "../pages/HomePage/HomePage";
import LoginPage from "../pages/LoginPage/LoginPage";
import MyPage from "../pages/MyPage/MyPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/my",
        element: <MyPage />,
      },
      {
        path: "/signup",
        element: <SignUpPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
    ],
  },
]);

export default router;
