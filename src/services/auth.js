import api from "./api";

/**
 * Authentication service for handling user login state
 */
class AuthService {
  /**
   * Login the user
   * @param {string} email - User email
   * @param {string} password - User password
   * @returns {Promise} - Promise with login result
   */
  async login(email, password) {
    try {
      const response = await api.post("/login", { email, password });

      // Store the token and user data in localStorage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      return response.data;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  }

  /**
   * Logout the user
   * @returns {Promise} - Promise with logout result
   */
  async logout() {
    try {
      // Call logout endpoint if available
      // This is optional and depends on your backend implementation
      await api.post("/logout");
    } catch (error) {
      console.error("Logout API error:", error);
      // Continue with local logout even if API fails
    } finally {
      // Clear authentication data regardless of API result
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("rememberMe");
    }
  }

  /**
   * Check if user is authenticated
   * @returns {boolean} Authentication status
   */
  isAuthenticated() {
    const token = localStorage.getItem("token");
    return !!token;
  }

  /**
   * Get the current user
   * @returns {Object|null} User object or null
   */
  getUser() {
    const userStr = localStorage.getItem("user");
    if (!userStr) return null;

    try {
      return JSON.parse(userStr);
    } catch (error) {
      console.error("Error parsing user data:", error);
      return null;
    }
  }

  /**
   * Get the authentication token
   * @returns {string|null} Authentication token or null
   */
  getToken() {
    return localStorage.getItem("token");
  }

  /**
   * Register a new user
   * @param {Object} userData - User registration data
   * @returns {Promise} - Promise with registration result
   */
  async register(userData) {
    try {
      const response = await api.post("/register", userData);
      return response.data;
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  }

  /**
   * Send password reset request
   * @param {string} email - User email
   * @returns {Promise} - Promise with reset request result
   */
  async forgotPassword(email) {
    try {
      const response = await api.post("/forgot-password", { email });
      return response.data;
    } catch (error) {
      console.error("Forgot password error:", error);
      throw error;
    }
  }

  /**
   * Reset password with token
   * @param {string} token - Reset token
   * @param {string} password - New password
   * @param {string} passwordConfirmation - Password confirmation
   * @returns {Promise} - Promise with reset result
   */
  async resetPassword(token, password, passwordConfirmation) {
    try {
      const response = await api.post("/reset-password", {
        token,
        password,
        password_confirmation: passwordConfirmation,
      });
      return response.data;
    } catch (error) {
      console.error("Reset password error:", error);
      throw error;
    }
  }
}

export default new AuthService();
