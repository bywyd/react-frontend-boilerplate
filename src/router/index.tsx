import { createBrowserRouter, Navigate } from "react-router-dom"
import { ProtectedRoute, PublicRoute } from "./protected-route"
import { AppLayout } from "@/components/layout/app-layout"
import LoginPage from "@/pages/login"
import DashboardPage from "@/pages/dashboard"
import ProfilePage from "@/pages/profile"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/dashboard" replace />,
  },
  {
    element: <PublicRoute />,
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AppLayout />,
        children: [
          {
            path: "/dashboard",
            element: <DashboardPage />,
          },
          {
            path: "/profile",
            element: <ProfilePage />,
          },
        ],
      },
    ],
  },
])
