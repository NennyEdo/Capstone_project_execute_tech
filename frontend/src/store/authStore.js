import { create } from "zustand";

const useAuthStore = create((set) => ({
  token: localStorage.getItem("authToken") || null,
  setToken: (token) => {
    set({ token });
    if (token) {
      localStorage.setItem("authToken", token);
    } else {
      localStorage.removeItem("authToken");
    }
  },
  logout: () => {
    set({ token: null });
    localStorage.removeItem("authToken");
  },
}));

export default useAuthStore;
