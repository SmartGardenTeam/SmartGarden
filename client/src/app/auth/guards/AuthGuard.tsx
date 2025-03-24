import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState, useCallback } from "react";

const AuthGuard = ({ children }: { children: JSX.Element }) => {
  const { accessToken, isTokenExpired, refreshAuthToken } = useAuth();
  const location = useLocation();
  const [isAuthenticating, setIsAuthenticating] = useState(true);

  const checkAuth = useCallback(async () => {
    if (isTokenExpired()) {
      console.log("Token expired, attempting refresh...");
      const refreshed = await refreshAuthToken();
      if (!refreshed) {
        console.log("Token refresh failed, logging out...");
        setIsAuthenticating(false);
        return;
      }
    }
    setIsAuthenticating(false);
  }, [refreshAuthToken]);

  useEffect(() => {
    if (!accessToken || isTokenExpired()) {
      checkAuth();
    } else {
      setIsAuthenticating(false);
    }
  }, [accessToken, checkAuth]);

  if (isAuthenticating) return <div>Loading...</div>;

  if (!accessToken || isTokenExpired()) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (location.pathname === "/") {
    return <Navigate to="/home" replace />;
  }

  return children;
};

export default AuthGuard;
