import { InputText } from "primereact/inputtext";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginRequest } from "../../models/LoginRequest";
import AuthService from "../../services/AuthService";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import JwtService from "../../../shared/services/JwtService";
import { useAuth } from "../../context/AuthContext";
import SGLogo from "../../../../assets/images/SmartGardenLogo.svg";
import { Checkbox } from "primereact/checkbox";
import LoginImage from "../../../../assets/images/LoginAndSignup.svg";
import { Password } from "primereact/password";
import CryptoJS from "crypto-js";
import { ENVIRONMENT } from "../../../../environments/environment";
import { useUser } from "../../../shared/context/UserContext";

const Login = () => {
  const { setAccessToken, setRefreshToken } = useAuth();
  const toast = useRef<Toast>(null);
  const [emailIsInvalid, setEmailIsInavlid] = useState<boolean>(false);
  const [user, setUser] = useState<LoginRequest>({
    email: "",
    password: "",
  });
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const navigate = useNavigate();
  const { setCurrentUser } = useUser();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [event.target?.name]: event.target.value });
  };

  const handleCheckboxChange = () => {
    handleRememberMe(!rememberMe);
    setRememberMe((prev) => !prev);
  };

  useEffect(() => {
    const savedEmail = localStorage.getItem("email");
    const encryptedPassword = localStorage.getItem("password");

    if (savedEmail && encryptedPassword) {
      try {
        const decryptedPassword = CryptoJS.AES.decrypt(
          encryptedPassword,
          ENVIRONMENT.SECRET_KEY
        ).toString(CryptoJS.enc.Utf8);

        setUser({ email: savedEmail, password: decryptedPassword });
        setRememberMe(true);
      } catch (error) {
        console.error("Failed to decrypt password", error);
      }
    }
  }, []);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    handleRememberMe(rememberMe);
    const emailIsValid = user.email.includes("@");

    if (!emailIsValid) {
      setEmailIsInavlid((valid) => !valid);
      return;
    } else {
      setEmailIsInavlid((valid) => !valid);
    }
    const response = await AuthService.login(user);

    if (response.success) {
      JwtService.setAccessToken(
        response.data.authenticationResponse.jwtAccessToken
      );
      JwtService.setRefreshToken(
        response.data.authenticationResponse.jwtRefreshToken
      );

      setAccessToken(response.data.authenticationResponse.jwtAccessToken);
      setRefreshToken(response.data.authenticationResponse.jwtRefreshToken);

      setCurrentUser(response.data.userResponse);
    } else {
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: response.errors[0],
        life: 3000,
      });
    }
  };

  const handleNavigateToForgotPassword = () => {
    handleRememberMe(rememberMe);
    navigate("/forgot-password");
  };

  const handleNavigateToSignUp = () => {
    handleRememberMe(rememberMe);
    navigate("/signup");
  };

  const handleRememberMe = (isToRemember: boolean) => {
    if (isToRemember) {
      const encryptedPassword = CryptoJS.AES.encrypt(
        user.password,
        ENVIRONMENT.SECRET_KEY
      ).toString();

      localStorage.setItem("email", user.email);
      localStorage.setItem("password", encryptedPassword);
    } else {
      localStorage.removeItem("email");
      localStorage.removeItem("password");
    }
  };

  return (
    <>
      <div className="d-flex justify-content-center min-vh-100 min-vw-100 vw-100 container auth">
        <div className="row m-auto card-background rounded-4">
          <div className="col d-flex rounded-start-4 flex-column p-0 shadow">
            <div className="w-80 min-h-100 m-auto">
              <div className="d-flex mb-4">
                <img src={SGLogo} alt="des" />
                <h2>Smart Garden</h2>
              </div>
              <h2 className="text-2xl font-bold">Welcome Back</h2>
              <h6 className="">
                Don't have an account?{" "}
                <span
                  role="button"
                  className="text-success cursor-pointer"
                  onClick={handleNavigateToSignUp}
                >
                  Sign up
                </span>
              </h6>
              <form
                onSubmit={handleSubmit}
                className="d-flex flex-column justify-space-between gap-3 w-80 space-y-4 "
              >
                <div className="w-100">
                  <InputText
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={user.email}
                    onChange={handleChange}
                    required
                    className={emailIsInvalid ? "p-invalid w-100" : "w-100"}
                  />
                  {emailIsInvalid && (
                    <p className="text-danger mt-1 mb-0">
                      Please enter a valid email address.
                    </p>
                  )}
                </div>

                <Password
                  feedback={false}
                  name="password"
                  placeholder="Password"
                  value={user.password}
                  onChange={handleChange}
                  required
                  toggleMask
                  className="mw-100"
                />
                <Button
                  type="submit"
                  label="Log in"
                  value="Login"
                  onClick={handleSubmit}
                />
              </form>
              <div className="d-flex justify-space-between gap-4 mt-3">
                <div className="d-flex align-items-center">
                  <Checkbox
                    onChange={handleCheckboxChange}
                    checked={rememberMe}
                  ></Checkbox>
                  <label htmlFor="acc" className="mx-2">
                    Remember me
                  </label>
                </div>
                <span
                  className="text-success cursor-pointer"
                  role="button"
                  onClick={handleNavigateToForgotPassword}
                >
                  Forgot password?
                </span>
              </div>
            </div>
          </div>
          <div className="col d-flex p-0 shadow mw-25 mh-50 rounded-end-4">
            <img
              src={LoginImage}
              alt="des"
              className="w-100 h-100 object-fit-cover rounded-end-4"
            />
          </div>
        </div>
      </div>

      <Toast ref={toast} />
    </>
  );
};

export default Login;
