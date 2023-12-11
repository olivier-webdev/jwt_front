import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { lazy } from "react";
import { userLoader } from "./loaders/userLoader";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
const Homepage = lazy(() => import("./pages/Homepage/Homepage"));
const Register = lazy(() => import("./pages/Register/Register"));
const Login = lazy(() => import("./pages/Login/Login"));
const Profile = lazy(() => import("./pages/Profile/Profile"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    loader: userLoader,
    children: [
      {
        index: true,
        element: <Homepage />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
