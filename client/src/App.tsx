import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import "./App.scss";
import Layout from "./app/layouts/layout/Layout";
import Login from "./app/auth/ui/login/Login";
import ForgotPassword from "./app/auth/ui/forgot-password/ForgotPassword";
import ResetPassword from "./app/auth/ui/reset-password/ResetPassword";
import Signup from "./app/auth/ui/signup/Signup";
import Home from "./app/general/home/Home";
import Garden from "./app/garden/ui/garden/Garden";
import CodeConfirmationPage from "./app/auth/ui/code-confirmation-page/CodeConfirmationPage";
import AuthGuard from "./app/auth/guards/AuthGuard";
import UnauthGuard from "./app/auth/guards/UnauthGuard";
import PlantAdministration from "./app/plant/ui/plant-administration/PlantAdministration";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthGuard>
        <Layout />
      </AuthGuard>
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "plant-administration",
        element: <PlantAdministration />,
      },
      {
        path: "gardens/:gardenId",
        element: <Garden />,
      },
      {
        path: "*",
        element: <Navigate to="/home" replace />,
      },
    ],
  },
  {
    path: "/signup",
    element: (
      <UnauthGuard>
        <Signup />
      </UnauthGuard>
    ),
  },
  {
    path: "/confirm-code",
    element: (
      <UnauthGuard>
        <CodeConfirmationPage />
      </UnauthGuard>
    ),
  },
  {
    path: "/login",
    element: (
      <UnauthGuard>
        <Login />
      </UnauthGuard>
    ),
  },
  {
    path: "/forgot-password",
    element: (
      <UnauthGuard>
        <ForgotPassword />
      </UnauthGuard>
    ),
  },
  {
    path: "/reset-password",
    element: (
      <UnauthGuard>
        <ResetPassword />
      </UnauthGuard>
    ),
  },
  {
    path: "*",
    element: <Navigate to="/login" replace />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
