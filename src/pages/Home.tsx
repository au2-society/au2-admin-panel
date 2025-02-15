import { useState } from "react";
import backgroundImage from "/login-bg.png";
import LoginPage from "@/components/landing/LoginPage";
import PasswordResetPage from "@/components/landing/PasswordResetPage";

function App() {
  const [currentPage, setCurrentPage] = useState<"login" | "reset">("login");

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat blur-md"
        style={{ backgroundImage: `url(${backgroundImage})` }}
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
          {currentPage === "login" ? (
            <LoginPage onForgotPassword={() => setCurrentPage("reset")} />
          ) : (
            <PasswordResetPage onBackToLogin={() => setCurrentPage("login")} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
