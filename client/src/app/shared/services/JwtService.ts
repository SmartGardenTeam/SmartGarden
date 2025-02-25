import { jwtDecode } from "jwt-decode";
import {
  JWT_ACCESS_TOKEN,
  JWT_REFRESH_TOKEN,
} from "../../auth/constants/TokenConstants";

class JwtService {
  static setAccessToken(token: string): void {
    if (token) {
      localStorage.setItem(JWT_ACCESS_TOKEN, token);
    }
  }

  static setRefreshToken(token: string): void {
    if (token) {
      localStorage.setItem(JWT_REFRESH_TOKEN, token);
    }
  }

  static getToken(token: string): string | null {
    return localStorage.getItem(token);
  }

  static removeToken(token: string): void {
    localStorage.removeItem(token);
  }

  static decodeToken(token: string): { [key: string]: string } | null {
    const toDecode = this.getToken(token);
    return toDecode ? jwtDecode<{ [key: string]: string }>(toDecode) : null;
  }

  static getDecodeToken(token: string): { [key: string]: string } | null {
    return this.decodeToken(token);
  }

  static getExpiryTime(token: string): number | null {
    const decodedToken = this.getDecodeToken(token);
    return decodedToken ? Number(decodedToken["exp"]) : null;
  }

  static isAccessTokenExpired(): boolean {
    const expiryTime = this.getExpiryTime(JWT_ACCESS_TOKEN);
    return expiryTime ? expiryTime * 1000 - Date.now() < 5000 : true;
  }
}

export default JwtService;
