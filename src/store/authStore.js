import { create } from "zustand";
import { api } from "../config/api";
import toast from "react-hot-toast";

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
      if (data) {
        set({ user: data, loading: false });
        return data.data;
      } else {
        set({ user: null, loading: false });
        return null;
      }
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

      if (data) {
        set({ user: data, loading: false });
        return data.data;
      } else {
        set({ user: null, loading: false });
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
    } catch (err) {
      toast.error(err.response?.data?.message);
      set({ user: null });
    }
  },

  // LOAD USER (on app start)
  loadUser: async () => {
    set({ isAuthChecking: true });
    try {
      const { data } = await api.get("/api/service-provider/me");
      if (data) {
        set({ user: data, loading: false });
      } else {
        set({ user: null, loading: false });
      }
    } catch (err) {
      toast.error(err.response?.data?.message);
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
      if (data) {
        set({ user: data, loading: false });
        toast.success("Updated successfully!");
      } else {
        set({ user: null, loading: false });
      }
    } catch (err) {
      toast.error(err.response?.data?.message);
      set({ user: null });
    }
  },
}));
