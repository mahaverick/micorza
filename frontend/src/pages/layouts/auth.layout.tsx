import { ErrorInfo, useCallback } from 'react'
import { Outlet, useNavigate, useNavigation } from 'react-router-dom'

import { Loader2 } from 'lucide-react'

import ErrorBoundary from '@/components/errors/error-boundary'
import { Button } from '@/components/ui/button'

function AuthLayout() {
  const navigation = useNavigation()
  const navigate = useNavigate()

  const handleError = useCallback((error: Error, errorInfo: ErrorInfo) => {
    // Log the error to an error reporting service
    // logErrorToService(error, errorInfo)

    // eslint-disable-next-line no-console
    console.error('ErrorBoundary auth layout caught an error:', error, errorInfo)
  }, [])

  return (
    <ErrorBoundary
      fallback={() => (
        <div className="flex h-screen flex-col items-center justify-center bg-background">
          <h1 className="mb-4 text-4xl font-bold text-primary">Oops!</h1>
          <p className="mb-8 text-xl text-muted-foreground">
            Something went wrong in authenticating user
          </p>
          <Button onClick={() => navigate('/')}>Go Home</Button>
        </div>
      )}
      onError={handleError}
    >
      {navigation.state === 'loading' ? (
        <div className="flex h-screen flex-col items-center justify-center">
          <Loader2 className="size-12 animate-spin text-primary" />
          <p className="mt-2 text-sm text-muted-foreground">Loading...</p>
        </div>
      ) : (
        <Outlet />
      )}
    </ErrorBoundary>
  )
}

export default AuthLayout
