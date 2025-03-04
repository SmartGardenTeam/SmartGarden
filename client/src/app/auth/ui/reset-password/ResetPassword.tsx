import { Toast } from "primereact/toast";
import { useEffect, useRef, useState } from "react";
import { ResetPasswordRequest } from "../../models/ResetPasswordRequest";
import { useLocation, useNavigate } from "react-router-dom";
import AuthService from "../../services/AuthService";
import SGLogo from "../../../../assets/images/SmartGardenLogo.svg";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

const ResetPassword = () => {
  const toast = useRef<Toast>(null);
  const [token, setToken] = useState<string | undefined>(undefined);
  const [password, setPassword] = useState<ResetPasswordRequest>({
    password: "",
  });
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tokenFromUrl = urlParams.get("token");
    if (tokenFromUrl) {
      setToken(tokenFromUrl);
    }
    console.log(token);
  }, [location]);

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    if (!token) {
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: "Token is missing.",
        life: 3000,
      });
      return;
    }

    const response = await AuthService.resetPassword(token, password);

    if (response.success) {
      toast.current?.show({
        severity: "success",
        summary: "Success!",
        detail: response.data,
        life: 3000,
      });
      navigate("/login");
    } else {
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: response.errors[0],
        life: 3000,
      });
    }
  };

  const handleSetPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword((prev) => ({
      ...prev,
      password: e.target.value,
    }));
  };

  return (
    <>
      <div className="d-flex vh-100 justify-content-center align-items-center scale">
        <div className="flex justify-content-center w-60 align-items-center min-h-screen">
          <div className="w-25rem p-5 shadow card-background rounded-4 ">
            <div className="d-flex justify-content-center align-items-center mb-3">
              <img src={SGLogo} alt="Logo" className="me-2" />
              <h1>Change password</h1>
            </div>
            <h5 className="mb-4">
              Please provide new password that will replace the old one
            </h5>
            <div className="p-fluid">
              <p>Enter new password</p>
              <div className="card flex justify-content-center">
                <InputText
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={password.password}
                  onChange={handleSetPassword}
                  className="w-full border rounded"
                />
              </div>
              <Button
                label="Confirm"
                onClick={handleSubmit}
                className="mt-3 w-full"
              />
            </div>
            <div className="d-flex mt-4 justify-content-center">
              <span
                className="text-success cursor-pointer"
                role="button"
                onClick={() => navigate("/login")}
              >
                Back to Login
              </span>
            </div>
          </div>
        </div>
      </div>
      <Toast ref={toast} />
    </>
  );
};

export default ResetPassword;
