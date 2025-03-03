import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.scss";
import Layout from "./app/layouts/layout/Layout";
import Login from "./app/auth/ui/login/Login";
import Signup from "./app/auth/ui/signup/Signup";
import Home from "./app/general/Home/Home";
import PageNotFound from "./app/general/PageNotFound";
import Garden from "./app/garden/ui/Garden/Garden";
import CodeConfirmationPage from "./app/auth/ui/code-confirmation-page/CodeConfirmationPage";
import AuthGuard from "./app/auth/guards/AuthGuard";
import UnauthGuard from "./app/auth/guards/UnauthGuard";

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
        path: "home",
        element: <Home />,
      },
      {
        path: "hydroponicGardens/:gardenId",
        element: <Garden />,
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
    path: "/confirmCode",
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
