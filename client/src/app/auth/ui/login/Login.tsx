import { InputText } from "primereact/inputtext";
import { ChangeEvent, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginRequest } from "../../models/LoginRequest";
import AuthService from "../../services/AuthService";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import JwtService from "../../../shared/services/JwtService";
import { useAuth } from "../../context/AuthContext";

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
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form onSubmit={handleSubmit} className="w-80 space-y-4">
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
          <Button type="submit" value="Login" onClick={handleSubmit} />
        </form>
        <p className="mt-4">
          Don't have an account?{" "}
          <span
            className="text-blue-500 cursor-pointer"
            onClick={() => navigate("/signup")}
          >
            Sign up
          </span>
        </p>
      </div>
      <Toast ref={toast} />
    </>
  );
};

export default Login;
