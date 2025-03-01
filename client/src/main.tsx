import { createRoot } from "react-dom/client";
import "./index.scss";
import { AuthProvider } from "../src/app/auth/context/AuthContext.tsx";
import App from "./App.tsx";
import { PrimeReactProvider } from "primereact/api";
import { UserProvider } from "./app/shared/context/UserContext.tsx";
import { ThemeProvider } from "./app/shared/context/ThemeContext.tsx";

createRoot(document.getElementById("root")!).render(
  <PrimeReactProvider>
    <ThemeProvider>
      <AuthProvider>
        <UserProvider>
          <App />
        </UserProvider>
      </AuthProvider>
    </ThemeProvider>
  </PrimeReactProvider>
);
