import { ChangeEvent, useRef, useState } from "react";
import AuthService from "../../services/AuthService";
import { InputText } from "primereact/inputtext";
import { SignupRequest } from "../../models/SignupRequest";
import { useNavigate } from "react-router-dom";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { useUser } from "../../../shared/context/UserContext";
import UserModel from "../../../shared/models/UserModel";
import SignInImage from "../../../../assets/images/SignInBackGround.svg";
import SGLogo from "../../../../assets/images/SmartGardenLogo.svg";

const Signup = () => {
  const [user, setUser] = useState<SignupRequest>({
    username: "",
    email: "",
    password: "",
  });
  const { setCurrentUser } = useUser();
  const navigate = useNavigate();
  const toast = useRef<Toast>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [event.target?.name]: event.target.value });
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

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
      <div className="d-flex justify-content-center min-vh-100 min-vw-100 vw-100 container m">
        <div className="row m-auto">
          <div className="col d-flex rounded-start-4 p-0 shadow mw-25 mh-50">
            <img
              src={SignInImage}
              alt="des"
              className="w-100 h-100 object-fit-cover rounded-start-4"
            />
          </div>
          <div className="col d-flex rounded-end-4 flex-column p-0  shadow">
            <div className="w-80 min-h-100 m-auto">
              <div className="d-flex flex-row pb-4">
                <img src={SGLogo} alt="des" />
                <h3>Smart Garden</h3>
              </div>

              <h2 className="text-2xl font-bold mt-4">Create an account</h2>
              <h6 className="">
                Already have an account?{" "}
                <span
                  className="text-success cursor-pointer"
                  onClick={() => navigate("/login")}
                >
                  Sign in
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
                  required
                />
                <InputText
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={user.password}
                  onChange={handleChange}
                  required
                />
                <Button
                  value="Sign up"
                  label="Register"
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
