import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const UnauthGuard = ({ children }: { children: JSX.Element }) => {
  const { accessToken, refreshToken, isTokenExpired } = useAuth();
  const isAuthenticated =
    (accessToken && !isTokenExpired()) || Boolean(refreshToken);

  return isAuthenticated ? <Navigate to="/home" replace /> : children;
};

export default UnauthGuard;
