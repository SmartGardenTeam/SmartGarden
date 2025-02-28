import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.scss";
import Layout from "./app/layouts/layout/Layout";
import Login from "./app/auth/ui/login/Login";
import Signup from "./app/auth/ui/signup/Signup";
import Home from "./app/general/Home";
import PageNotFound from "./app/general/PageNotFound";
import HydroponicGardens from "./app/garden/HydroponicGardens";
import HydroponicGarden from "./app/garden/HydroponicGarden";
import CodeConfirmationPage from "./app/auth/ui/code-confirmation-page/CodeConfirmationPage";
import AuthGuard from "./app/auth/guards/AuthGuard";
import UnauthGuard from "./app/auth/guards/UnauthGuard";
import { useState } from "react";
import PrimeReact from "primereact/api";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthGuard>
        <Layout />
      </AuthGuard>
    ),
    errorElement: <PageNotFound />,
    children: [
      {
        index: true,
        path: "home",
        element: <Home />,
      },
      {
        path: "hydroponicGardens",
        element: <HydroponicGardens />,
      },
      {
        path: "hydroponicGardens/:hydroponicGardenId",
        element: <HydroponicGarden />,
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
    path: "*",
    element: <PageNotFound />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
