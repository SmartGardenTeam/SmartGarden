import UserModel from "../../shared/models/UserModel";
import { AuthModel } from "./AuthModel";

export interface LoginModel {
  authenticationResponse: AuthModel;
  userResponse: UserModel;
}
