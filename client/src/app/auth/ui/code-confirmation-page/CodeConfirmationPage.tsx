import { useRef, useState } from "react";
import { Button } from "primereact/button";
import { Message } from "primereact/message";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/AuthService";
import { VerifyEmailRequest } from "../../models/VerifyEmailRequest";
import { useUser } from "../../../shared/context/UserContext";
import { Toast } from "primereact/toast";
import SGLogo from "../../../../assets/images/SmartGardenLogo.svg";
import { InputOtp, InputOtpChangeEvent } from "primereact/inputotp";
import "./CodeConfirmationPage.scss";

const CodeConfirmationPage = () => {
  const { currentUser } = useUser();

  const [token, setTokens] = useState<VerifyEmailRequest>({
    email: currentUser!.email,
    verificationCode: -1,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const toast = useRef<Toast>(null);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await AuthService.verify(token);
      if (response.success) {
        toast.current?.show({
          severity: "success",
          summary: "Success!",
          detail: response.data,
          life: 3000,
        });

        setTimeout(() => navigate("/login"), 1000);
      } else {
        toast.current?.show({
          severity: "error",
          summary: "Error",
          detail: response.errors[0],
          life: 3000,
        });
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSetCode = (e: InputOtpChangeEvent) => {
    setTokens((prev) => ({
      ...prev,
      verificationCode: e.value ? Number(e.value) : prev.verificationCode,
    }));
  };
  return (
    <>
      <div className="d-flex vh-100 justify-content-center align-items-center scale">
        <div className="flex justify-content-center align-items-center min-h-screen">
          <div className="w-25rem p-5 card-background shadow rounded-4">
            <div className="d-flex align-items-center">
              <img src={SGLogo} alt="Logo" className="classes.logoSize me-2" />
              <h5 className="m-0">Confirm Your Code</h5>
            </div>
            <div className="p-fluid">
              <label htmlFor="code">Enter Code</label>
              <InputOtp
                value={token.verificationCode}
                onChange={handleSetCode}
                integerOnly
                length={6}
              />
              {error && (
                <Message severity="error" text={error} className="mt-2" />
              )}
              <Button
                label="Verify"
                onClick={handleSubmit}
                loading={loading}
                className="mt-3 w-full"
              />
            </div>
          </div>
        </div>
      </div>
      <Toast ref={toast} />
    </>
  );
};

export default CodeConfirmationPage;
