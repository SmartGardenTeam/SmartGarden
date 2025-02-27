import { InputText } from "primereact/inputtext";
import { ChangeEvent, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginRequest } from "../../models/LoginRequest";
import AuthService from "../../services/AuthService";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import JwtService from "../../../shared/services/JwtService";
import { useAuth } from "../../context/AuthContext";
import SGLogo from "../../../../assets/images/SmartGardenLogo.svg";
import SignInImage from "../../../../assets/images/SignInBackGround.svg";
import { Checkbox } from "primereact/checkbox";

const Login = () => {
  const { setAccessToken, setRefreshToken } = useAuth();
  const toast = useRef<Toast>(null);
  const [user, setUser] = useState<LoginRequest>({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [event.target?.name]: event.target.value });
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const response = await AuthService.login(user);

    if (response.success) {
      JwtService.setAccessToken(response.data.jwtAccessToken);
      JwtService.setRefreshToken(response.data.jwtRefreshToken);

      setAccessToken(response.data.jwtAccessToken);
      setRefreshToken(response.data.jwtRefreshToken);
    } else {
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: response.errors[0],
        life: 3000,
      });
    }
  };

  return (
    <>
      <div className="d-flex justify-content-center min-vh-100 min-vw-100 vw-100 container m">
        <div className="row m-auto">
          <div className="col d-flex rounded-start-4 flex-column p-0  shadow">
            <div className="w-80 min-h-100 m-auto">
              <div className="d-flex mb-4">
                <img src={SGLogo} alt="des" />
                <h2>Smart Garden</h2>
              </div>
              <h2 className="text-2xl font-bold">Welcome Back</h2>
              <h6 className="">
                Don't have an account?{" "}
                <span
                  className="text-success cursor-pointer"
                  onClick={() => navigate("/signup")}
                >
                  Sign up
                </span>
              </h6>
              <form
                onSubmit={handleSubmit}
                className="d-flex flex-column justify-space-between gap-3 w-80 space-y-4"
              >
                <InputText
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={user.email}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
                <InputText
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={user.password}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
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
                  //onChange={(e) => setChecked(e.checked)}
                  //checked={checked}
                  ></Checkbox>
                  <label htmlFor="acc" className="mx-2">
                    Remember me
                  </label>
                </div>
                <span
                  className="text-success cursor-pointer"
                  //onClick={() => navigate("/signup")}
                >
                  Forgot password?
                </span>
              </div>
            </div>
          </div>
          <div className="col d-flex rounded-end-4 p-0 shadow mw-25 mh-50">
            <img
              src={SignInImage}
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
