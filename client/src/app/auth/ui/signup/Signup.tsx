import {
  ChangeEvent,
  Reducer,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import AuthService from "../../services/AuthService";
import { InputText } from "primereact/inputtext";
import { SignupRequest } from "../../models/SignupRequest";
import { useNavigate } from "react-router-dom";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { useUser } from "../../../shared/context/UserContext";
import UserModel from "../../../shared/models/UserModel";
import SignInImage from "../../../../assets/images/LoginAndSignup.svg";
import SGLogo from "../../../../assets/images/SmartGardenLogo.svg";
import "./Signup.module.scss";
import { Password } from "primereact/password";
import classes from "./Signup.module.scss";

type SignupRequest = {
  username: string;
  email: string;
  password: string;
};
type Action = { type: "SET_FIELD"; field: keyof SignupRequest; value: string };

const fnReducer = (state: SignupRequest, action: Action): SignupRequest => {
  switch (action.type) {
    case "SET_FIELD":
      return {
        ...state,
        [action.field]: action.value,
      };
    default:
      return state;
  }
};

const Signup = () => {
  const initialState = {
    username: "",
    email: "",
    password: "",
  };
  const [user, dispatch] = useReducer(fnReducer, initialState);
  const [repeatPassword, setRepeatPassword] = useState<string>("");
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(true);
  const { setCurrentUser } = useUser();
  const [isEmailValid, setIsEmailValid] = useState<boolean>(true);
  const navigate = useNavigate();
  const toast = useRef<Toast>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "SET_FIELD",
      field: event.target.name as keyof SignupRequest,
      value: event.target.value,
    });
  };
  const handleRepeatPassword = (event: ChangeEvent<HTMLInputElement>) => {
    setRepeatPassword(event.target.value);
  };
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const emailIsValid = user.email.includes("@");
    if (!emailIsValid) {
      setIsEmailValid(false);
      return;
    } else {
      setIsEmailValid(true);
    }

    const passwordsMatch = user.password === repeatPassword;
    setIsPasswordValid(passwordsMatch);

    if (passwordsMatch) {
      return;
    }
    const response = await AuthService.signup(user);

    if (response.success) {
      const prevCurrentUser: UserModel = {
        id: -1,
        username: user.username,
        email: user.email,
      };

      setCurrentUser(prevCurrentUser);

      toast.current?.show({
        severity: "success",
        summary: "Success!",
        detail: response.data,
        life: 3000,
      });

      setTimeout(() => navigate("/confirm-code"), 1000);
    } else {
      toast.current?.show({
        severity: "error",
        summary: "Error!",
        detail: response.errors[0],
        life: 3000,
      });
    }
  };

  return (
    <>
      <div className="d-flex justify-content-center min-vh-100 min-vw-100 vw-100 container auth">
        <div className="row m-auto card-background rounded-4">
          <div className="col d-flex rounded-start-4 p-0 shadow mw-25 mh-50">
            <img
              src={SignInImage}
              alt="des"
              className="w-100 h-100 object-fit-cover rounded-start-4"
            />
          </div>
          <div className="col d-flex rounded-end-4 flex-column p-0 shadow">
            <div className="w-80 min-h-100 m-auto">
              <div className="d-flex flex-row pb-4">
                <img src={SGLogo} alt="des" />
                <h3>Smart Garden</h3>
              </div>
              <h2 className="text-2xl font-bold mt-4">Create an account</h2>
              <h6 className="">
                Already have an account?{" "}
                <span
                  role="button"
                  className="text-success cursor-pointer"
                  onClick={() => navigate("/login")}
                >
                  Log in
                </span>
              </h6>
              <form
                onSubmit={handleSubmit}
                className="w-80 d-flex flex-column justify-space-between gap-3 my-4"
              >
                <InputText
                  type="text"
                  name="username"
                  placeholder="Full Name"
                  value={user.username}
                  onChange={handleChange}
                  required
                />
                <InputText
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={user.email}
                  onChange={handleChange}
                  className={!isEmailValid ? "p-invalid w-100" : "w-100"}
                  required
                />

                <Password
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={user.password}
                  onChange={handleChange}
                  pt={{
                    input: {
                      style: isPasswordValid
                        ? { width: "100%" }
                        : { width: "100%", borderColor: "red" },
                    },
                    root: {
                      style: { width: "100%" },
                    },
                  }}
                  required
                  toggleMask
                />
                <Password
                  type="password"
                  name="repeatPassword"
                  placeholder="Repeat Password"
                  value={repeatPassword}
                  onChange={handleRepeatPassword}
                  pt={{
                    input: {
                      style: isPasswordValid
                        ? { width: "100%" }
                        : { width: "100%", borderColor: "red" },
                    },
                    root: {
                      style: { width: "100%" },
                    },
                  }}
                  required
                  toggleMask
                />
                {!isPasswordValid && (
                  <p className="text-danger mb-0">Passwords do not match!</p>
                )}
                <Button
                  value="Sign up"
                  label="Sign up"
                  onClick={handleSubmit}
                  className="p-button"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
      <Toast ref={toast} />
    </>
  );
};

export default Signup;
