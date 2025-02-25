import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import JwtService from "../../shared/services/JwtService";
import {
  JWT_ACCESS_TOKEN,
  JWT_REFRESH_TOKEN,
} from "../constants/TokenConstants";
import { ENVIRONMENT } from "../../../environments/environment";

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

    // Request Interceptor
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

        if (
          error.response &&
          error.response.status === 401 &&
          error.response.data.message === "TokenExpiredError" &&
          !originalRequest._retry
        ) {
          if (!this.isRefreshing) {
            this.isRefreshing = true;

            try {
              const newTokens = await this.refreshTokens();
              JwtService.setAccessToken(newTokens.accessToken);
              JwtService.setRefreshToken(newTokens.refreshToken);

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

  // Refresh token function
  private async refreshTokens(): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
    const refreshToken = JwtService.getToken(JWT_REFRESH_TOKEN);
    if (!refreshToken) throw new Error("No refresh token available");

    const response = await this.axiosInstance.post<{
      data: { accessToken: string; refreshToken: string };
    }>("/auth/refresh-token", { refreshToken });

    return response.data.data;
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

  public async put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response: AxiosResponse<T> = await this.axiosInstance.put(
      url,
      data,
      config
    );
    return response.data;
  }

  public async delete<T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response: AxiosResponse<T> = await this.axiosInstance.delete(
      url,
      config
    );
    return response.data;
  }
}

export const api = new AxiosInterceptor({
  baseURL: ENVIRONMENT.serverUrl,
});
