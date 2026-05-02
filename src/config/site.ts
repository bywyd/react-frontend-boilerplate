export const siteConfig = {
  name: import.meta.env.VITE_APP_NAME,
  description: import.meta.env.VITE_APP_DESCRIPTION ?? "A Vite + React starter template with authentication, dashboard, and more.",
  version: import.meta.env.VITE_APP_VERSION ?? "1.0.0",
} as const;
