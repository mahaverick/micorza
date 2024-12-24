import { createBrowserRouter } from 'react-router-dom'

import { checkAuthStatusLoader } from '@/router/loaders/auth.loader'

import NotFound from '@/components/errors/not-found'
import AuthGuard from '@/components/guards/auth.guard'
import ProtectedGuard from '@/components/guards/protected.guard'
import Home from '@/pages/home.page'
import RootLayout from '@/pages/layouts/root.layout'

import { authRoutes } from './routes/auth.routes'
import { dashboardRoutes } from './routes/dashboard.routes'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: '',
        loader: checkAuthStatusLoader,
        children: [
          {
            element: <AuthGuard />,
            children: authRoutes,
          },
          {
            element: <ProtectedGuard />,
            children: dashboardRoutes,
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
])

export default router
