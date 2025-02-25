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
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
        <form onSubmit={handleSubmit} className="w-80 space-y-4">
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
          <Button type="submit" value="Sign up" onClick={handleSubmit} />
        </form>
        <p className="mt-4">
          Already have an account?{" "}
          <span
            className="text-blue-500 cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </div>
      <Toast ref={toast} />
    </>
  );
};

export default Signup;
