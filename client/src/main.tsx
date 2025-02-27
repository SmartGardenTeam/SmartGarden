import { createRoot } from "react-dom/client";
import "./index.css";
import { AuthProvider } from "../src/app/auth/context/AuthContext.tsx";
import App from "./App.tsx";
import { PrimeReactProvider } from "primereact/api";
import { UserProvider } from "./app/shared/context/UserContext.tsx";

createRoot(document.getElementById("root")!).render(
  <PrimeReactProvider>
    <AuthProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </AuthProvider>
  </PrimeReactProvider>
);
