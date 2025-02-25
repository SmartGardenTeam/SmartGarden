import { createContext, useContext, useState, useEffect } from "react";
import { api } from "../interceptors/JwtInterceptor";
import { AuthContextType } from "../interfaces/AuthContextType";
import JwtService from "../../shared/services/JwtService";
import {
  JWT_ACCESS_TOKEN,
  JWT_REFRESH_TOKEN,
} from "../constants/TokenConstants";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(
    JwtService.getToken(JWT_ACCESS_TOKEN)
  );
  const [refreshToken, setRefreshToken] = useState<string | null>(
    JwtService.getToken(JWT_REFRESH_TOKEN)
  );

  useEffect(() => {
    if (accessToken) {
      JwtService.setAccessToken(accessToken);
    } else {
      JwtService.removeToken(JWT_ACCESS_TOKEN);
    }

    if (refreshToken) {
      JwtService.setRefreshToken(refreshToken);
    } else {
      JwtService.removeToken(JWT_REFRESH_TOKEN);
    }
  }, [accessToken, refreshToken]);

  const isTokenExpired = () => JwtService.isAccessTokenExpired();

  const refreshAuthToken = async (): Promise<boolean> => {
    if (!refreshToken) return false;

    try {
      const response = await api.post("/auth/refresh-token", {
        refreshToken,
      });
      const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
        response.data;

      setAccessToken(newAccessToken);
      setRefreshToken(newRefreshToken);

      return true;
    } catch (error) {
      setAccessToken(null);
      setRefreshToken(null);
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        refreshToken,
        setAccessToken,
        setRefreshToken,
        isTokenExpired,
        refreshAuthToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
