import { create } from "zustand";
import { api } from "../config/api";
import toast from "react-hot-toast";

// Restore token from localStorage if exists so axios can send Authorization on reload
const _savedToken = typeof window !== "undefined" ? localStorage.getItem("token") : null;
if (_savedToken) {
  api.defaults.headers.common["Authorization"] = `Bearer ${_savedToken}`;
}

export const useAuthStore = create((set) => ({
  user: null,
  isAuthChecking: false,
  setUser: (user) => set({ user }),

  // LOGIN
  login: async (credentials) => {
    set({ loading: true, error: null });
    try {
      const { data } = await api.post(
        "/api/service-provider/login",
        credentials
      );
      const payload = data?.data || data;
      // attach token to axios default headers for subsequent requests
      if (payload?.token) {
        api.defaults.headers.common["Authorization"] = `Bearer ${payload.token}`;
        try { localStorage.setItem("token", payload.token); } catch {
          console.error("Failed to save token to localStorage");
        }
      }
      set({ user: payload || null, loading: false });
      return payload || null;
    } catch (err) {
      toast.error(err.response?.data?.message);
      set({ user: null });
    }
  },

  // REGISTER
  register: async (userData) => {
    try {
      const { data } = await api.post("/api/service-provider", userData);
      console.log(data);
      const payload = data?.data || data;
      if (payload) {
        if (payload?.token) {
          api.defaults.headers.common["Authorization"] = `Bearer ${payload.token}`;
          try { localStorage.setItem("token", payload.token); } catch {
            console.error("Failed to save token to localStorage");
          }
        }
        set({ user: payload, loading: false });
        return payload;
      } else {
        set({ user: null, loading: false });
        return null;
      }
    } catch (err) {
      toast.error(err.response?.data?.message);
      set({ user: null });
    }
  },

  // LOGOUT
  logout: async () => {
    try {
      const { data } = await api.post("/api/service-provider/logout");
      console.log(data);
      set({ user: null, loading: false });
      try { localStorage.removeItem("token"); } catch {
       console.error("Failed to remove token from localStorage");
      }
      delete api.defaults.headers.common["Authorization"];
    } catch (err) {
      toast.error(err.response?.data?.message);
      set({ user: null });
    }
  },

  // LOAD USER (on app start)
  loadUser: async () => {
    set({ isAuthChecking: true });
    try {
      const response = await api.get("/api/auth/me");
      const payload = response.data?.data || response.data || null;
      const profileData = payload?.profile || payload;

      if (profileData) {
        set({ user: profileData });
      } else {
        set({ user: null });
      }
    } catch (err) {
      toast("Please login again", err.response?.data?.message);
      return null;
    } finally {
      set({ isAuthChecking: false });
    }
  },

  // UPDATE PROFILE
  updateProfile: async (updates) => {
    set({ loading: true, error: null });
    try {
      const { data } = await api.put("/api/service-provider/me", updates);
      const payload = data?.data || data;
      if (payload) {
        set({ user: payload, loading: false });
        toast.success("Updated successfully!");
      } else {
        set({ user: null, loading: false });
      }
    } catch (err) {
      toast.error(err.response?.data?.message);
      set({ user: null });
    }
  },
  updateServiceDetails: (serviceId, serviceType) =>
    set((state) => ({
      user: {
        ...state.user,
        serviceId,
        serviceType,
      },
    })),
}));
