import { lazy, Suspense } from "react"
import { createBrowserRouter, Navigate } from "react-router-dom"
import { ProtectedRoute, PublicRoute } from "./protected-route"
import { AppLayout } from "@/components/layout/app-layout"
import { Spinner } from "@/components/ui/spinner"

const LoginPage = lazy(() => import("@/pages/login"))
const DashboardPage = lazy(() => import("@/pages/dashboard"))
const ProfilePage = lazy(() => import("@/pages/profile"))

function PageLoader() {
  return (
    <div className="flex h-full flex-1 items-center justify-center py-16">
      <Spinner className="size-6" />
    </div>
  )
}

function withSuspense(element: React.ReactNode) {
  return <Suspense fallback={<PageLoader />}>{element}</Suspense>
}

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
        element: withSuspense(<LoginPage />),
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
            element: withSuspense(<DashboardPage />),
          },
          {
            path: "/profile",
            element: withSuspense(<ProfilePage />),
          },
        ],
      },
    ],
  },
])
