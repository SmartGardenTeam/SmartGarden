import { useRef, useState } from "react";
import AuthService from "../../services/AuthService";
import { Toast } from "primereact/toast";
import { ForgotPasswordRequest } from "../../models/ForgotPasswordRequest";
import SGLogo from "../../../../assets/images/SmartGardenLogo.svg";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const toast = useRef<Toast>(null);
  const [email, setEmail] = useState<ForgotPasswordRequest>({
    email: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const response = await AuthService.forgotPassword(email);

    if (response.success) {
      toast.current?.show({
        severity: "success",
        summary: "Success!",
        detail: response.data,
        life: 3000,
      });
    } else {
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: response.errors[0],
        life: 3000,
      });
    }
  };
  const handleSetEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail((prev) => ({
      ...prev,
      email: e.target.value,
    }));
  };

  return (
    <>
      <div className="d-flex vh-100 justify-content-center align-items-center scale">
        <div className="flex justify-content-center w-60 align-items-center min-h-screen">
          <div className="w-25rem p-5 shadow card-background rounded-4 ">
            <div className="d-flex justify-content-center align-items-center mb-3">
              <img src={SGLogo} alt="Logo" className="me-2" />
              <h1>Forgot your password</h1>
            </div>
            <h5 className="mb-4">
              Please enter the email address you'd like your password <br></br>
              reset information sent to
            </h5>
            <div className="p-fluid">
              <p>Enter email address</p>
              <div className="card flex justify-content-center">
                <InputText
                  type="email"
                  name="email"
                  id="Email"
                  placeholder="Email"
                  value={email.email}
                  onChange={handleSetEmail}
                  className="w-full border rounded"
                />
              </div>
              <Button
                label="Request reset link"
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

export default ForgotPassword;
