<template>
  <div class="w-full h-screen">
    <div class="flex shadow rounded-md h-screen">
      <div class="bg-white dark:bg-gray-900 w-full">
        <form @submit.prevent="handleLogin">
          <div
            class="form-body lg:max-w-xl mx-auto lg:p-20 p-8 lg:mt-20 mt-5 space-y-8"
          >
            <div class="form-head cursor-pointer" @click="$router.push('/')">
              <img
                src="../../../assets/logo/imin-logo.png"
                alt=""
                class="w-32 -ml-2"
              />
            </div>
            <div class="space-y-3">
              <h2 class="dark:text-white font-semibold text-gray-800 text-4xl">
                Welcome, to iMin Dashboard<span class="text-primary">.</span>
              </h2>
              <p class="dark:text-gray-400 text-gray-700">
                Please enter your account to continue.
              </p>
            </div>

            <!-- Error Alert -->
            <div
              v-if="error"
              class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <span class="block sm:inline">{{ error }}</span>
            </div>

            <button
              type="button"
              class="dark:text-white text-gray-700 flex justify-center gap-2 dark:bg-gray-700 bg-gray-100 hover:bg-gray-100/50 p-2 w-full rounded-md"
            >
              <img
                class="w-8"
                src="../../../assets/logo/google-logo.svg"
                alt=""
              />
              <p class="mt-1 dark:text-white text-gray-700">
                Sign in with Google
              </p>
            </button>
            <span class="flex items-center justify-center space-x-2">
              <span class="h-px dark:bg-gray-600 bg-gray-200 w-full"></span>
              <span class="font-normal text-gray-500">or </span>
              <span class="h-px dark:bg-gray-600 bg-gray-200 w-full"></span>
            </span>
            <div class="space-y-5">
              <div class="relative z-0 w-full mb-6 group">
                <input
                  type="email"
                  name="floating_email"
                  id="floating_email"
                  v-model="email"
                  class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-primary focus:outline-none focus:ring-0 focus:border-primary peer"
                  placeholder=" "
                  required
                />
                <label
                  for="floating_email"
                  class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary peer-focus:dark:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >Email address</label
                >
              </div>
              <div class="relative z-0 w-full mb-6 group">
                <input
                  type="password"
                  name="floating_password"
                  id="floating_password"
                  v-model="password"
                  class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-primary focus:outline-none focus:ring-0 focus:border-primary peer"
                  placeholder=" "
                  required
                />
                <label
                  for="floating_password"
                  class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary peer-focus:dark:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >Password</label
                >
              </div>
            </div>
            <div class="flex justify-between">
              <div class="flex items-start">
                <div class="flex items-center h-5">
                  <input
                    id="remember"
                    type="checkbox"
                    v-model="rememberMe"
                    autocomplete="off"
                    class="accent-primary focus:ring-4 cursor-pointer w-4 h-4 border border-gray-300 rounded dark:bg-gray-700 bg-gray-50 focus:ring-3 focus:ring-primary/30"
                  />
                </div>
                <label
                  for="remember"
                  class="ml-2 text-sm cursor-pointer font-normal dark:text-white text-gray-500"
                  >Remember for 30 days</label
                >
              </div>
              <button
                type="button"
                @click="$router.push('/forgot-password')"
                class="text-sm dark:text-white hover:text-primary text-gray-700"
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              class="text-white bg-primary hover:bg-primary/80 p-3 w-full rounded-md flex justify-center"
              :disabled="isLoading"
            >
              <span v-if="isLoading" class="inline-block mr-2">
                <svg
                  class="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  ></circle>
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              </span>
              {{ isLoading ? "Logging in..." : "Login, to continue" }}
            </button>
            <p class="dark:text-white text-center text-gray-700">
              Don't have an account?<button
                type="button"
                @click="$router.push('/register')"
                class="ml-2 text-primary"
              >
                Register here
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import AuthService from "../../../services/auth";

export default {
  name: "Login",
  setup() {
    const router = useRouter();
    const route = useRoute();

    const email = ref("");
    const password = ref("");
    const rememberMe = ref(false);
    const error = ref("");
    const isLoading = ref(false);

    const handleLogin = async () => {
      // Clear previous errors
      error.value = "";
      isLoading.value = true;

      try {
        // Call authentication service
        const result = await AuthService.login(email.value, password.value);

        // Handle "remember me" option if needed
        if (rememberMe.value) {
          // Set longer expiration or flag in local storage
          localStorage.setItem("rememberMe", "true");
        }

        // Redirect to intended destination or dashboard
        const redirectPath = route.query.redirect || "/";
        router.push(redirectPath);
      } catch (err) {
        console.error("Login error:", err);
        error.value = "Invalid email or password. Please try again.";
      } finally {
        isLoading.value = false;
      }
    };

    return {
      email,
      password,
      rememberMe,
      error,
      isLoading,
      handleLogin,
    };
  },
};
</script>
