import { Link, useNavigate } from 'react-router-dom'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { handleFormErrors } from '@/utils/form.utils'
import { cn } from '@/utils/global.utils'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import PasswordInput from '@/components/ui/password-input'
import { register } from '@/endpoints/auth.endpoints'

const formSchema = z.object({
  username: z.string().min(3).max(255),
  firstName: z.string().min(1).max(255),
  middleName: z.string().max(255).optional(),
  lastName: z.string().max(255).optional(),
  email: z.string().email().max(255),
  password: z.string().min(8).max(255),
  role: z.enum(['user', 'admin']).default('user'),
  phone: z.string().max(32).optional(),
  avatar: z.string().url().max(255).optional(),
  dateOfBirth: z.date().optional(),
  gender: z.enum(['male', 'female', 'other']).optional(),
})

export type RegisterData = z.infer<typeof formSchema>

const Register = () => {
  const navigate = useNavigate()

  const form = useForm<RegisterData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      role: 'user',
    },
  })

  const registerMutation = useMutation({
    mutationFn: (data: RegisterData) => register(data),
    onSuccess: (response: AxiosResponse) => {
      // eslint-disable-next-line no-console
      console.log(response)
      navigate('/login')
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      handleFormErrors<RegisterData>(error, form.setError)
    },
  })

  function onSubmit(values: RegisterData) {
    registerMutation.mutate(values)
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">New Account</h1>
      </header>
      <Card className="mx-auto w-full max-w-lg">
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription>
            Please fill in your information to create a new account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
              {form.formState.errors.root && (
                <div className="text-destructive">{form.formState.errors.root.message}</div>
              )}
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="john-doe"
                        {...field}
                        className={cn(form.formState.errors.username && 'border-destructive')}
                      />
                    </FormControl>
                    <FormDescription>
                      This will be your unique identifier on the platform.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="John"
                        {...field}
                        className={cn(form.formState.errors.firstName && 'border-destructive')}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Doe"
                        {...field}
                        className={cn(form.formState.errors.lastName && 'border-destructive')}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="john.doe@example.com"
                        {...field}
                        className={cn(form.formState.errors.email && 'border-destructive')}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <PasswordInput
                        {...field}
                        error={!!form.formState.errors.password}
                        showPasswordStrength={true}
                      />
                    </FormControl>
                    <FormDescription>Must be at least 8 characters long.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={registerMutation.isPending}>
                {registerMutation.isPending ? 'Registering...' : 'Register'}
              </Button>
            </form>
          </Form>
          <div className="mt-4 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-primary hover:underline">
              Log in
            </Link>
          </div>
          <div className="mt-2 text-center text-xs text-muted-foreground">
            By registering, you agree to our{' '}
            <Link to="/terms" className="text-primary hover:underline">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link to="/privacy" className="text-primary hover:underline">
              Privacy Policy
            </Link>
            .
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Register
