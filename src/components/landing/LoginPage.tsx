import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { loginSchema } from "@/schemas";

interface LoginPageProps {
  onForgotPassword: () => void;
}

const LoginPage = ({ onForgotPassword }: LoginPageProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    setIsLoading(true);
    setError(null);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log(values);
      // TODO: Add login logic AND toast
    } catch (err) {
      setError("Failed to login. Please check your credentials and try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md space-y-8 p-6 rounded-lg">
      <div className="text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
          Admin Login
        </h2>
        <p className="mt-2 text-sm text-gray-900 dark:text-gray-400">
          University Event Management System
        </p>
      </div>
      {error && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="admin@university.edu"
                    autoComplete="email"
                    {...field}
                    className="w-full rounded-lg bg-black/10 dark:bg-white/10 backdrop-blur-lg border border-gray-300 dark:border-white/20 px-4 py-2 font-semibold text-gray-900 dark:text-white placeholder-gray-800 dark:placeholder-gray-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 transition"
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
                  <Input
                    type="password"
                    autoComplete="current-password"
                    {...field}
                    className="w-full rounded-lg bg-black/10 dark:bg-white/10 backdrop-blur-lg border border-gray-300 dark:border-white/20 px-4 py-2 text-gray-900 dark:text-white placeholder-gray-800 dark:placeholder-gray-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 transition"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Checkbox id="remember" />
              <label
                htmlFor="remember"
                className="ml-2 text-sm text-gray-900 dark:text-gray-400"
              >
                Remember me
              </label>
            </div>
            <Button
              type="button"
              variant="link"
              onClick={onForgotPassword}
              className="text-sm text-gray-900 dark:text-gray-400 hover:underline"
            >
              Forgot password?
            </Button>
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2
                  className="mr-2 h-4 w-4 animate-spin"
                  aria-hidden="true"
                />
                Logging in...
              </>
            ) : (
              "Log in"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default LoginPage;
