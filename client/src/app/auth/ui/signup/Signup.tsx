import { ChangeEvent, useRef, useState } from "react";
import AuthService from "../../services/AuthService";
import { InputText } from "primereact/inputtext";
import { SignupRequest } from "../../models/SignupRequest";
import { useNavigate } from "react-router-dom";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { useUser } from "../../../shared/context/UserContext";
import UserModel from "../../../shared/models/UserModel";

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
      <body className="d-flex justify-content-center min-vw-100 vw-100 container">
        <div className="row">
          <div className="col d-flex align-items-center p-0 justify-content-center mw-25 mh-50">
            <img
              src="../../../src/assets/SignInBackGround.svg"
              alt="des"
              class="w-100 h-100 object-fit-cover"
            />
          </div>
          <div className="col d-flex  flex-column p-0 shadow">
            <div class="w-80 mx-auto my-auto">
              <div className="d-flex flex-row mx-">
                <img src="../../../src/assets/SmartGardenLogo.svg" alt="des" />
                <h3>Smart Garden</h3>
              </div>

              <h2 className="text-2xl font-bold mt-3">Create an account</h2>
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
                className="w-80 d-flex flex-column justify-space-between gap-3 "
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
                <button
                  type="button"
                  value="Sign up"
                  onClick={handleSubmit}
                  class="btn btn-outline-success w-100 mx-auto"
                >
                  Register
                </button>
              </form>
            </div>
          </div>
        </div>

        <Toast ref={toast} />
      </body>
    </>
  );
};

export default Signup;
