import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentAdmin } from "@/store/slices/authSlice";
import { AppDispatch, RootState } from "@/store/store";
import { Routes, Route, Navigate } from "react-router-dom";
import LoadingPage from "@/pages/LoadingPage";
import { AuthPage } from "@/pages/auth";
import { ProfilePage } from "@/pages/profile";
import DashboardPage from "@/pages/dashboard";
import { ThemeProvider } from "@/components/global/ThemeProvider";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated, loading } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(fetchCurrentAdmin());
    }
  }, [dispatch, isAuthenticated]);

  if (loading) {
    return <LoadingPage />;
  }
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? <Navigate to="/dashboard" /> : <AuthPage />
          }
        />
        <Route
          path="/dashboard"
          element={isAuthenticated ? <DashboardPage /> : <Navigate to="/" />}
        />
        <Route
          path="/profile"
          element={isAuthenticated ? <ProfilePage /> : <Navigate to="/" />}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
