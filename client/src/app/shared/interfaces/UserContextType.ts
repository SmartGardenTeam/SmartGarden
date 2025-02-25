import UserModel from "../models/UserModel";

export default interface UserContextType {
  currentUser: UserModel | null;
  setCurrentUser: (currentUser: UserModel | null) => void;
}
