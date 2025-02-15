import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { resetSchema } from "@/schemas";

interface PasswordResetPageProps {
  onBackToLogin: () => void;
}

const PasswordResetPage = ({ onBackToLogin }: PasswordResetPageProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const form = useForm<z.infer<typeof resetSchema>>({
    resolver: zodResolver(resetSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof resetSchema>) {
    setIsLoading(true);
    setStatus("idle");
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Password reset requested for:", values.email);
      // TODO: Add password reset logic AND toast
      setStatus("success");
    } catch (err) {
      setStatus("error");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
          Reset Password
        </h2>
        <p className="mt-2 text-sm text-gray-900 dark:text-gray-400">
          Enter your email to receive a password reset link
        </p>
      </div>
      {status === "success" && (
        <Alert>
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>
            If an account exists for that email, we have sent password reset
            instructions.
          </AlertDescription>
        </Alert>
      )}
      {status === "error" && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Failed to send reset instructions. Please try again.
          </AlertDescription>
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
                    {...field}
                    className="w-full rounded-lg bg-black/10 dark:bg-white/10 backdrop-blur-lg border border-gray-300 dark:border-white/20 px-4 py-2 font-semibold text-gray-900 dark:text-white placeholder-gray-800 dark:placeholder-gray-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 transition"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
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
          onClick={onBackToLogin}
          className="text-sm text-gray-900 dark:text-gray-400 hover:underline"
        >
          Back to Login
        </Button>
      </div>
    </div>
  );
};

export default PasswordResetPage;
