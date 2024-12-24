import { Suspense } from 'react'

import { Dashboard } from '@/router/routes/lazy.routes'

import NotFound from '@/components/errors/not-found'
import SuspenseLoader from '@/components/features/suspense-loader'
import DashboardLayout from '@/pages/layouts/dashboard.layout'

export const dashboardRoutes = [
  {
    path: '',
    element: <DashboardLayout />,
    children: [
      {
        path: 'dashboard',
        element: (
          <Suspense fallback={<SuspenseLoader size="large" text="Loading content..." />}>
            <Dashboard />
          </Suspense>
        ),
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]
