<template>
  <!-- sidebar -->
  <nav class="sidebar bg-white dark:bg-gray-800">
    <!-- sidebar head -->
    <div class="sidebar-head p-4">
      <router-link to="/" exact class="flex">
        <img
          class="w-40 mt-1"
          src="@/assets/logo/imin-logo.png"
          alt="imin-logo"
        />
      </router-link>
      <div
        class="bg-gray-700 absolute mt-3 dark:block hidden rounded-md py-1 px-2 text-xs text-gray-200"
      >
        Dark mode
      </div>
      <button
        class="lg:hidden block dark:text-gray-400 float-right -mt-7"
        @click="$emit('sidebarToggle')"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          role="img"
          width="25px"
          height="25px"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 32 32"
        >
          <path
            fill="currentColor"
            d="M7.219 5.781L5.78 7.22L14.563 16L5.78 24.781l1.44 1.439L16 17.437l8.781 8.782l1.438-1.438L17.437 16l8.782-8.781L24.78 5.78L16 14.563z"
          />
        </svg>
      </button>
    </div>
    <!-- sidebar list -->
    <div class="sidebar-list p-4 mt-4 divide-y dark:divide-gray-700">
      <div class="pb-5">
        <p class="font-medium text-gray-400 dark:text-gray-400">Menu</p>
        <div class="wrap-item mt-4 dark:text-gray-500">
          <div class="item">
            <router-link
              to="/"
              exact
              class="w-full flex text-left rounded-md box-border p-3 hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <span class="mr-3 text-xl"><Icon icon="bxs:dashboard" /></span>
              <span class="w-full"> Dashboard </span>
            </router-link>
          </div>
          <div class="item mt-3">
            <menu-accordion>
              <template v-slot:icon>
                <Icon icon="gg:components" />
              </template>
              <template v-slot:title> Product Management </template>
              <template v-slot:content>
                <router-link
                  to="/pages/all-products"
                  class="w-full text-left block rounded-md p-3 hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  All Products
                </router-link>
                <router-link
                  to="/pages/categories"
                  class="w-full text-left block rounded-md p-3 hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  Categories
                </router-link>
              </template>
            </menu-accordion>
          </div>
          <div class="item mt-3">
            <menu-accordion>
              <template v-slot:icon>
                <Icon icon="gg:components" />
              </template>
              <template v-slot:title> Orders </template>
              <template v-slot:content>
                <router-link
                  to="/pages/all-orders"
                  class="w-full text-left block rounded-md p-3 hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  All Orders
                </router-link>
                <router-link
                  to="/pages/shipments"
                  class="w-full text-left block rounded-md p-3 hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  Shipments
                </router-link>
              </template>
            </menu-accordion>
          </div>
          <div class="item mt-3">
            <router-link to="/tables">
              <button
                class="text-gray-800 dark:text-gray-500 bg-transparent hover:bg-gray-200 dark:hover:bg-gray-700 w-full flex text-left rounded-md box-border p-3"
              >
                <span class="mr-3 text-xl"><Icon icon="bi:table" /></span>
                <span class="w-full"> Customers </span>
                <span class="box-border mt-1 text-gray-500"> </span>
              </button>
            </router-link>
          </div>
        </div>
      </div>
      <div class="pb-5">
        <p class="font-medium text-gray-400 mt-4 dark:text-gray-400">Other</p>

        <div class="item mt-3">
          <menu-accordion>
            <template v-slot:icon>
              <Icon icon="gg:components" />
            </template>
            <template v-slot:title> Report </template>
            <template v-slot:content>
              <router-link
                to="/component/accordion"
                class="w-full text-left text-gray-600 block rounded-md p-3 hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                Sales Report
              </router-link>
              <router-link
                to="/component/accordion"
                class="w-full text-left text-gray-600 block rounded-md p-3 hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                Inventory Report
              </router-link>
            </template>
          </menu-accordion>
        </div>

        <div class="item mt-3">
          <router-link to="/tables">
            <button
              class="text-gray-800 dark:text-gray-500 bg-transparent hover:bg-gray-200 dark:hover:bg-gray-700 w-full flex text-left rounded-md box-border p-3"
            >
              <span class="mr-3 text-xl"><Icon icon="bi:table" /></span>
              <span class="w-full"> Settings </span>
              <span class="box-border mt-1 text-gray-500"> </span>
            </button>
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { Icon } from "@iconify/vue";
import MenuAccordion from "./MenuAccordion.vue";
export default {
  components: {
    Icon,
    MenuAccordion,
  },
};
</script>
