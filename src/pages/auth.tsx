import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";
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
import { loginSchema, resetSchema } from "@/schemas";
import { setCredentials } from "@/store/slices/authSlice";
import axios from "@/api/axios";

export function AuthPage() {
  const [currentView, setCurrentView] = useState<"login" | "reset">("login");
  const [error, setError] = useState<string | null>(null);
  const [resetStatus, setResetStatus] = useState<"idle" | "success" | "error">(
    "idle"
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });

  const resetForm = useForm<z.infer<typeof resetSchema>>({
    resolver: zodResolver(resetSchema),
    defaultValues: {
      email: "",
    },
  });

  const loginMutation = useMutation({
    mutationFn: async (data: z.infer<typeof loginSchema>) => {
      const response = await axios.post("/admin/login", data);
      console.log("Login response:", response.data.data);
      return response.data.data;
    },
    onSuccess: (data) => {
      dispatch(setCredentials(data));
      navigate("/dashboard");
    },
    onError: (error) => {
      console.log(error)
      // @ts-expect-error error
      setError(error.response?.data?.message || "Failed to login");
    },
  });

  const resetMutation = useMutation({
    mutationFn: async (data: z.infer<typeof resetSchema>) => {
      const response = await axios.post("/auth/reset-password", data);
      return response.data;
    },
    onSuccess: () => {
      setResetStatus("success");
    },
    onError: () => {
      setResetStatus("error");
    },
  });

  const onLoginSubmit = (data: z.infer<typeof loginSchema>) => {
    setError(null);
    loginMutation.mutate(data);
  };

  const onResetSubmit = (data: z.infer<typeof resetSchema>) => {
    setResetStatus("idle");
    resetMutation.mutate(data);
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat blur-md"
        style={{ backgroundImage: `url(/login-bg.png)` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-purple-600/30 dark:from-black/70 dark:to-black/70"></div>
      </div>
      <div className="relative z-10 w-full max-w-md px-4 py-8 sm:px-0">
        <div className="mb-8 text-center">
          <img
            src="/logo.png"
            alt="University Logo"
            className="mx-auto h-20 w-20"
          />
        </div>
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6 shadow-lg">
          {currentView === "login" ? (
            <div className="w-full max-w-md space-y-8">
              <div className="text-center">
                <h2 className="text-3xl font-extrabold text-white">
                  Admin Login
                </h2>
                <p className="mt-2 text-sm text-gray-200">
                  University Event Management System
                </p>
              </div>
              {error && (
                <Alert variant="destructive">
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <Form {...loginForm}>
                <form
                  onSubmit={loginForm.handleSubmit(onLoginSubmit)}
                  className="space-y-6"
                >
                  <FormField
                    control={loginForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="admin@cumail.in"
                            autoComplete="email"
                            {...field}
                            className="bg-white/20 text-white placeholder-gray-300"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={loginForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            autoComplete="current-password"
                            {...field}
                            className="bg-white/20 text-white"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex items-center justify-between">
                    <FormField
                      control={loginForm.control}
                      name="remember"
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-2">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              className="border-white data-[state=checked]:bg-white data-[state=checked]:text-black"
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal text-white">
                            Remember me
                          </FormLabel>
                        </FormItem>
                      )}
                    />
                    <Button
                      type="button"
                      variant="link"
                      onClick={() => setCurrentView("reset")}
                      className="text-sm text-white hover:text-gray-200"
                    >
                      Forgot password?
                    </Button>
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-white text-black hover:bg-gray-100"
                    disabled={loginMutation.isPending}
                  >
                    {loginMutation.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Logging in...
                      </>
                    ) : (
                      "Log in"
                    )}
                  </Button>
                </form>
              </Form>
            </div>
          ) : (
            <div className="w-full max-w-md space-y-8">
              <div className="text-center">
                <h2 className="text-3xl font-extrabold text-white">
                  Reset Password
                </h2>
                <p className="mt-2 text-sm text-gray-200">
                  Enter your email to receive a password reset link
                </p>
              </div>
              {resetStatus === "success" && (
                <Alert>
                  <AlertTitle>Success</AlertTitle>
                  <AlertDescription>
                    If an account exists for that email, we have sent password
                    reset instructions.
                  </AlertDescription>
                </Alert>
              )}
              {resetStatus === "error" && (
                <Alert variant="destructive">
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>
                    Failed to send reset instructions. Please try again.
                  </AlertDescription>
                </Alert>
              )}
              <Form {...resetForm}>
                <form
                  onSubmit={resetForm.handleSubmit(onResetSubmit)}
                  className="space-y-6"
                >
                  <FormField
                    control={resetForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="admin@cumail.in"
                            {...field}
                            className="bg-white/20 text-white placeholder-gray-300"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    className="w-full bg-white text-black hover:bg-gray-100"
                    disabled={resetMutation.isPending}
                  >
                    {resetMutation.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      "Send Reset Instructions"
                    )}
                  </Button>
                </form>
              </Form>
              <div className="text-center">
                <Button
                  type="button"
                  variant="link"
                  onClick={() => setCurrentView("login")}
                  className="text-sm text-white hover:text-gray-200"
                >
                  Back to Login
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
