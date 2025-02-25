import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState, useCallback } from "react";

const AuthGuard = ({ children }: { children: JSX.Element }) => {
  const { accessToken, isTokenExpired, refreshAuthToken } = useAuth();
  const location = useLocation();
  const [isAuthenticating, setIsAuthenticating] = useState(true);

  const checkAuth = useCallback(async () => {
    if (accessToken && isTokenExpired()) {
      await refreshAuthToken();
    }
    setIsAuthenticating(false);
  }, [accessToken, isTokenExpired, refreshAuthToken]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isAuthenticating) return <div>Loading...</div>;

  if (!accessToken || isTokenExpired()) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default AuthGuard;
