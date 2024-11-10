import { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import useLoginStore from "../../store/login.store";

const ProtectedRoute = ({ children }: PropsWithChildren) => {
  const isLoggedIn = useLoginStore((state) => state.isLoggedIn);

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
