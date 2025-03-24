import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import JwtService from "../../shared/services/JwtService";
import {
  JWT_ACCESS_TOKEN,
  JWT_REFRESH_TOKEN,
} from "../constants/TokenConstants";
import { ENVIRONMENT } from "../../../environments/environment";
import { useAuth } from "../context/AuthContext";

class AxiosInterceptor {
  private axiosInstance: AxiosInstance;
  private isRefreshing: boolean;
  private refreshSubscribers: ((token: string) => void)[];

  constructor(instanceConfig: AxiosRequestConfig = {}) {
    this.isRefreshing = false;
    this.refreshSubscribers = [];

    this.axiosInstance = axios.create({
      ...instanceConfig,
      headers: {
        "Content-Type": "application/json",
        ...instanceConfig.headers,
      },
    });

    this.axiosInstance.interceptors.request.use(
      (config) => {
        const accessToken = JwtService.getToken(JWT_ACCESS_TOKEN);
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    this.axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
          if (!this.isRefreshing) {
            this.isRefreshing = true;
            try {
              const newTokens = await this.refreshTokens();
              this.refreshSubscribers.forEach((callback) =>
                callback(newTokens.accessToken)
              );
              this.refreshSubscribers = [];
              return this.axiosInstance(originalRequest);
            } catch (refreshError) {
              JwtService.removeToken(JWT_REFRESH_TOKEN);
              JwtService.removeToken(JWT_ACCESS_TOKEN);
              return Promise.reject(refreshError);
            } finally {
              this.isRefreshing = false;
            }
          }
          return new Promise((resolve) => {
            this.refreshSubscribers.push((newAccessToken) => {
              originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
              originalRequest._retry = true;
              resolve(this.axiosInstance(originalRequest));
            });
          });
        }
        return Promise.reject(error);
      }
    );
  }

  private async refreshTokens(): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
    const { refreshAuthToken } = useAuth();
    const success = await refreshAuthToken();
    if (!success) throw new Error("Failed to refresh token");
    return {
      accessToken: JwtService.getToken(JWT_ACCESS_TOKEN)!,
      refreshToken: JwtService.getToken(JWT_REFRESH_TOKEN)!,
    };
  }

  public async get<T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response: AxiosResponse<T> = await this.axiosInstance.get(
      url,
      config
    );
    return response.data;
  }

  public async post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response: AxiosResponse<T> = await this.axiosInstance.post(
      url,
      data,
      config
    );
    return response.data;
  }
}

export const api = new AxiosInterceptor({ baseURL: ENVIRONMENT.SERVER_URL });
