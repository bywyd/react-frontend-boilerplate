import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from 'next-themes'
import { RouterProvider } from 'react-router-dom'
import { Toaster } from './components/ui/sonner'
import { router } from './router'
import { MdiContainer } from './components/mdi/mdi-container'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <RouterProvider router={router} />
        <MdiContainer />
        <Toaster richColors />
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App