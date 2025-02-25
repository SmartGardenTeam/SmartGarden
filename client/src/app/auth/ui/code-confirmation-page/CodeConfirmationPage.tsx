import { ChangeEvent, useRef, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Message } from "primereact/message";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/AuthService";
import { VerifyEmailRequest } from "../../models/VerifyEmailRequest";
import { useUser } from "../../../shared/context/UserContext";
import { Toast } from "primereact/toast";

const CodeConfirmationPage = () => {
  const { currentUser } = useUser();

  const [code, setCode] = useState<VerifyEmailRequest>({
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
      const response = await AuthService.verify(code);
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

  const handleSetCode = (e: ChangeEvent<HTMLInputElement>) => {
    setCode((prev) => ({
      ...prev,
      verificationCode: Number(e.target.value),
    }));
  };
  return (
    <>
      <div className="flex justify-content-center align-items-center min-h-screen">
        <Card title="Confirm Your Code" className="w-25rem">
          <div className="p-fluid">
            <label htmlFor="code">Enter Code</label>
            <InputText
              id="code"
              value={`${code.verificationCode}`}
              onChange={handleSetCode}
              className="w-full"
            />
            {error && (
              <Message severity="error" text={error} className="mt-2" />
            )}
            <Button
              label="Verify"
              icon="pi pi-check"
              onClick={handleSubmit}
              loading={loading}
              className="mt-3 w-full"
            />
          </div>
        </Card>
      </div>
      <Toast ref={toast} />
    </>
  );
};

export default CodeConfirmationPage;
