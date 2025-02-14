"use client";

import { ThemeProvider } from "@/components/ThemeProvider";
import { Routes, Route } from "react-router-dom";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import Dashboard from "@/pages/Dashboard";
import ComingSoon from "@/pages/ComingSoon";
import LoadingPage from "@/pages/LoadingPage";
import { useState, useEffect } from "react";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<ComingSoon />} />
          <Route path="events" element={<ComingSoon />} />
          <Route path="participants" element={<ComingSoon />} />
          <Route path="settings" element={<ComingSoon />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
