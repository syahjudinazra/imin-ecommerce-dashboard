<template>
  <header class="bg-white dark:bg-gray-800 p-2 border-b-2 dark:border-gray-700">
    <div class="wrap-header flex items-center gap-5 justify-between flex-wrap">
      <!-- Left side with menu toggle and search -->
      <div class="flex flex-no-shrink items-center">
        <button
          class="text-gray-500 lg:hidden ml-3 block"
          @click="$emit('sidebarToggle', true)"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            role="img"
            width="2em"
            height="2em"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 16 16"
          >
            <path
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M2.75 12.25h10.5m-10.5-4h10.5m-10.5-4h10.5"
            />
          </svg>
        </button>
        <div
          class="input-box border dark:bg-gray-900 lg:ml-0 ml-5 dark:border-gray-700 rounded-md hidden lg:w-search w-full box-border lg:flex md:flex focus-within:bg-gray-100 dark:focus-within:bg-gray-700"
        >
          <span class="text-3xl p-2 text-gray-400">
            <Icon icon="ei:search" />
          </span>
          <input
            type="text"
            placeholder="Search..."
            class="p-3 w-full bg-white dark:bg-gray-900 dark:text-gray-400 rounded-md outline-none focus:bg-gray-100 dark:focus:bg-gray-700"
          />
        </div>
      </div>

      <!-- Right side with user info and controls -->
      <div class="mr-5 flex gap-3">
        <!-- Search button (mobile) -->
        <button class="lg:hidden block mr-5 text-2xl text-gray-500 relative">
          <i>
            <Icon icon="ic:outline-search" />
          </i>
        </button>

        <!-- Fullscreen toggle -->
        <button
          @click="fullscreenToggle"
          class="mr-5 text-2xl text-gray-500 relative"
        >
          <i v-if="!fullscreenMode">
            <Icon icon="ic:outline-fullscreen" />
          </i>
          <i v-else>
            <Icon icon="ic:outline-fullscreen-exit" />
          </i>
        </button>

        <!-- Theme toggle buttons -->
        <button
          @click="setTheme(true)"
          class="mr-5 text-2xl text-gray-500"
          v-if="!darkMode"
        >
          <Icon icon="ph:sun-dim" />
        </button>
        <button
          @click="setTheme(false)"
          v-else
          class="mr-5 text-2xl text-gray-500"
        >
          <Icon icon="ri:moon-fill" />
        </button>

        <!-- User profile dropdown trigger -->
        <button @blur="menuToggleBlur" @click="menuToggle">
          <div class="user-avatar flex p-1 cursor-pointer rounded-md">
            <div>
              <img
                src="../assets/logo/iminfavicon.jpg"
                class="rounded-full mr-4 w-10 h-10 p-1 ring-1 ring-gray-300 dark:ring-gray-500"
                alt="User avatar"
              />
            </div>
            <div class="text-left lg:block md:block hidden">
              <h2 class="dark:text-white text-gray-800 font-medium">
                {{ user ? user.name : "" }}
              </h2>
              <p class="text-xs text-gray-400 dark:text-gray-500">
                {{ userRoles }}
              </p>
            </div>
          </div>
        </button>

        <!-- User dropdown menu -->
        <transition name="fade">
          <div
            id="dropdownSmall"
            v-show="menu"
            class="block absolute right-10 mt-12 z-50 w-52 border dark:border-gray-700 bg-white dark:bg-gray-800 rounded divide-y dark:divide-gray-700 divide-gray-100 shadow"
          >
            <div class="py-3 px-4 text-sm text-gray-900 dark:text-gray-200">
              <div>Logged As</div>
              <div class="font-medium truncate">
                {{ user ? user.name : "" }}
              </div>
              <div class="text-xs text-gray-500 dark:text-gray-400">
                {{ userRoles }}
              </div>
            </div>
            <ul
              class="py-1 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdownSmallButton"
            >
              <li>
                <a
                  href="#"
                  class="block py-2 px-4 hover:bg-primary hover:text-white"
                  >User Profile</a
                >
              </li>
              <li>
                <a
                  href="#"
                  class="block py-2 px-4 hover:bg-primary hover:text-white"
                  >Settings</a
                >
              </li>
            </ul>

            <div class="py-1">
              <a
                href="#"
                @click="signOut"
                class="block py-2 px-4 text-sm text-gray-700 dark:text-gray-200 hover:bg-primary hover:text-white"
                >Sign out</a
              >
            </div>
          </div>
        </transition>
      </div>
    </div>
  </header>
</template>

<script>
import { Icon } from "@iconify/vue";
import { fullscreen } from "@/helper/fullscreen";
import { setDarkMode, loadDarkMode } from "@/helper/theme";
import api from "@/services/api";

export default {
  data() {
    return {
      menu: false,
      darkMode: false,
      notification: false,
      fullscreenMode: false,
      user: null,
    };
  },
  components: {
    Icon,
  },
  computed: {
    userRoles() {
      if (!this.user || !this.user.roles || this.user.roles.length === 0) {
        return "No roles";
      }
      return this.user.roles.map((role) => role.name).join(", ");
    },
  },
  watch: {
    $route() {
      this.menu = false;
    },
  },
  methods: {
    fullscreen,
    setDarkMode,
    loadDarkMode,

    menuToggle: function () {
      this.menu = !this.menu;
    },
    menuToggleBlur: function () {
      this.menu = false;
    },
    fullscreenToggle() {
      this.fullscreenMode = !this.fullscreenMode;
      this.fullscreen(this.fullscreenMode);
    },
    // set theme to dark and light
    setTheme(bool) {
      this.darkMode = bool;
      this.setDarkMode(bool);
    },

    imageAssets(url) {
      return require("@/assets/img/" + url);
    },
    fetchCurrentUser() {
      // Get the authentication token
      const token = localStorage.getItem("token");

      if (!token) {
        console.log("No token found, redirecting to login");
        this.$router.push({ name: "Login" });
        return;
      }

      // Set authorization header
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      api
        .get("/user", config)
        .then((response) => {
          this.user = response.data.data;
          console.log("User data fetched:", this.user);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          // Handle unauthorized access or token expiration
          if (error.response && error.response.status === 401) {
            localStorage.removeItem("token");
            this.$router.push({ name: "Login" });
          }
        });
    },
    signOut() {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      this.$router.push({ name: "Login" });
    },
  },
  mounted() {
    // get theme dark or light with loadDarkMode()
    this.darkMode = this.loadDarkMode();

    document.onfullscreenchange = (event) => {
      if (document.fullscreenElement) {
        this.fullscreenMode = true;
      } else {
        this.fullscreenMode = false;
      }
    };

    this.fetchCurrentUser();
  },
};
</script>
