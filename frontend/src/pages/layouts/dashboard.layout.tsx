import { ErrorInfo, useCallback } from 'react'
import { Outlet, useNavigate, useNavigation } from 'react-router-dom'

import { Loader2 } from 'lucide-react'

import { cn } from '@/utils/global.utils'

import ErrorBoundary from '@/components/errors/error-boundary'
import AppSidebar from '@/components/features/app-sidebar'
import Header from '@/components/features/header'
import { Button } from '@/components/ui/button'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'

function DashboardLayout() {
  const navigate = useNavigate()
  const navigation = useNavigation()

  const handleError = useCallback((error: Error, errorInfo: ErrorInfo) => {
    // Log the error to an error reporting service
    // logErrorToService(error, errorInfo)

    // eslint-disable-next-line no-console
    console.error('ErrorBoundary dashboard layout caught an error:', error, errorInfo)
  }, [])

  return (
    <ErrorBoundary
      fallback={() => (
        <div className="flex h-screen flex-col items-center justify-center bg-background">
          <h1 className="mb-4 text-4xl font-bold text-primary">Oops!</h1>
          <p className="mb-8 text-xl text-muted-foreground">Something went wrong in dashboard</p>
          <Button onClick={() => navigate('/')}>Go Home</Button>
        </div>
      )}
      onError={handleError}
    >
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <Header />
          <main
            className={cn(
              'min-h-[calc(100%-4rem)] flex-1 bg-background px-4 py-2 transition-all duration-300'
            )}
          >
            {navigation.state === 'loading' ? (
              <div className="flex h-screen flex-col items-center justify-center">
                <Loader2 className="size-12 animate-spin text-primary" />
                <p className="mt-2 text-sm text-muted-foreground">Loading...</p>
              </div>
            ) : (
              <Outlet />
            )}
          </main>
        </SidebarInset>
      </SidebarProvider>
    </ErrorBoundary>
  )
}

export default DashboardLayout
