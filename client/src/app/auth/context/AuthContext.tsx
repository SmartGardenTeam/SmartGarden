import { createContext, useContext, useState, useEffect } from "react";
import JwtService from "../../shared/services/JwtService";
import {
  JWT_ACCESS_TOKEN,
  JWT_REFRESH_TOKEN,
} from "../constants/TokenConstants";
import { AuthContextType } from "../interfaces/AuthContextType";
import { ENVIRONMENT } from "../../../environments/environment";
import axios from "axios";

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
      console.log("Setting new access token in localStorage:", accessToken);
      JwtService.setAccessToken(accessToken);
    }

    if (refreshToken) {
      console.log("Setting new refresh token in localStorage:", refreshToken);
      JwtService.setRefreshToken(refreshToken);
    }
  }, [accessToken, refreshToken]);

  const isTokenExpired = () => JwtService.isAccessTokenExpired();

  const refreshAuthToken = async (): Promise<boolean> => {
    if (!refreshToken) return false;

    try {
      const response = await axios.post(
        ENVIRONMENT.SERVER_URL + "auth/refresh-token",
        {
          refreshToken: JwtService.getToken(JWT_REFRESH_TOKEN),
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const newAccessToken = response.data.data.jwtAccessToken;
      const newRefreshToken = response.data.data.jwtRefreshToken;

      JwtService.setAccessToken(newAccessToken);
      JwtService.setRefreshToken(newRefreshToken);

      setAccessToken(newAccessToken);
      setRefreshToken(newRefreshToken);

      return true;
    } catch {
      console.log("not here");
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
