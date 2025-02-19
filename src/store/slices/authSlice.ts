import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/api/axios";
import TokenManager from "@/api/tokenManager";
import { TAdmin } from "@/types/admin";

export const fetchCurrentAdmin = createAsyncThunk(
  "auth/fetchCurrentAdmin",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get<{ admin: TAdmin }>(
        "/admin/current-admin"
      );
      // @ts-expect-error data
      return data.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue("Failed to fetch admin data");
    }
  }
);

export const logoutAdmin = createAsyncThunk(
  "auth/logout",
  async (_, { dispatch }) => {
    try {
      await axiosInstance.post("/admin/logout");
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      TokenManager.clearTokens();
      dispatch(logout());
      window.location.href = "/";
    }
  }
);

interface AuthState {
  admin: TAdmin | null;
  isAuthenticated: boolean;
  loading: boolean;
}

const initialState: AuthState = {
  admin: null,
  isAuthenticated: !!TokenManager.getAccessToken(),
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{
        admin: TAdmin;
        accessToken: string;
        refreshToken: string;
      }>
    ) => {
      const { admin, accessToken, refreshToken } = action.payload;
      TokenManager.setTokens(accessToken, refreshToken);
      state.admin = admin;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.admin = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentAdmin.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCurrentAdmin.fulfilled, (state, action) => {
        state.admin = action.payload;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(fetchCurrentAdmin.rejected, (state) => {
        state.admin = null;
        state.isAuthenticated = false;
        state.loading = false;
      });
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
