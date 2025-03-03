import { VerifyEmailRequest } from "./../models/VerifyEmailRequest";
import { api } from "../interceptors/JwtInterceptor";
import { LoginRequest } from "../models/LoginRequest";
import { SignupRequest } from "../models/SignupRequest";
import { Response } from "../../shared/models/Response";
import { AuthModel } from "../models/AuthModel";
import { ENVIRONMENT } from "../../../environments/environment";

const API_URL = ENVIRONMENT.serverUrl + "auth/";

const AuthService = {
  signup: async function (
    signupRequest: SignupRequest
  ): Promise<Response<string>> {
    return api.post(API_URL + "signup", signupRequest);
  },

  login: async function (
    loginRequest: LoginRequest
  ): Promise<Response<AuthModel>> {
    return api.post(API_URL + "login", loginRequest);
  },

  verify: async function (
    verifyEmailRequest: VerifyEmailRequest
  ): Promise<Response<string>> {
    return api.post(API_URL + "verify", verifyEmailRequest);
  },
};

export default AuthService;
