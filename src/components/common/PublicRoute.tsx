import { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import useLoginStore from "../../store/login.store";

const PublicRoute = ({ children }: PropsWithChildren) => {
  const isLoggedIn = useLoginStore((state) => state.isLoggedIn);

  if (isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PublicRoute;
