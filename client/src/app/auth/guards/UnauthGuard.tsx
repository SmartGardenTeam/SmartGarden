import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const UnauthGuard = ({ children }: { children: JSX.Element }) => {
  const { accessToken, refreshToken, isTokenExpired } = useAuth();
  const location = useLocation();

  const isAuthenticated =
    (accessToken && !isTokenExpired()) || Boolean(refreshToken);

  return isAuthenticated ? (
    <Navigate to={location.state?.from || "/home"} replace />
  ) : (
    children
  );
};

export default UnauthGuard;
