import { defineStore } from "pinia";
import AuthService from "../services/auth";
import router from "../router";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: AuthService.getUser(),
    token: AuthService.getToken(),
    returnUrl: null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
    currentUser: (state) => state.user,
  },

  actions: {
    async login(email, password) {
      try {
        const response = await AuthService.login(email, password);

        this.user = response.user;
        this.token = response.token;

        // Redirect to previously attempted URL or dashboard
        const redirectTo = this.returnUrl || "/";
        router.push(redirectTo);

        return true;
      } catch (error) {
        console.error("Login failed:", error);
        return false;
      }
    },

    logout() {
      AuthService.logout();
      this.user = null;
      this.token = null;

      // Redirect to login page
      router.push("/login");
    },

    setReturnUrl(url) {
      this.returnUrl = url;
    },
  },
});
