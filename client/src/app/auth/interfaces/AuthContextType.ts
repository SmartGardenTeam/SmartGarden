export interface AuthContextType {
  accessToken: string | null;
  refreshToken: string | null;
  setAccessToken: (token: string | null) => void;
  setRefreshToken: (token: string | null) => void;
  isTokenExpired: () => boolean;
  refreshAuthToken: () => Promise<boolean>;
}
