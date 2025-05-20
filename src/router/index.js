import { createRouter, createWebHistory } from "vue-router";

// Default Pages
import Dashboard from "../views/Dashboard.vue";
// Component Pages
import AllProducts from "../views/pages/allproducts.vue";
import AddProductsPage from "@/views/products/AddProductsPage.vue";
import EditProductsPage from "@/views/products/EditProductsPage.vue";
import Categories from "@/views/pages/categories.vue";
import AddCategoriesPage from "@/views/categories/AddCategoriesPage.vue";
import EditCategoriesPage from "@/views/categories/EditCategoriesPage.vue";
import Orders from "@/views/pages/allorders.vue";
import AddOrdersPage from "@/views/orders/AddOrdersPage.vue";
import EditOrdersPage from "@/views/orders/EditOrdersPage.vue";
import Login from "../views/layouts/auth/Login.vue";
import Register from "../views/layouts/auth/Register.vue";
import ForgotPassword from "../views/layouts/auth/forgot-password.vue";

// layouts
import Blank from "../views/layouts/Blank.vue";

// error page
import Page404 from "../views/layouts/error/404.vue";
import Page500 from "../views/layouts/error/500.vue";
import PageMaintenance from "../views/layouts/error/maintenance.vue";

const routes = [
  {
    path: "/",
    name: "Dashboard",
    component: Dashboard,
    meta: {
      title: "Dashboard",
      requiresAuth: true,
    },
  },
  {
    path: "/pages/all-products",
    name: "AllProducts",
    component: AllProducts,
    meta: {
      title: "All Products",
      requiresAuth: true,
    },
  },
  {
    path: "/products/add-product",
    name: "AddProduct",
    component: AddProductsPage,
    meta: {
      title: "Add Product",
      requiresAuth: true,
    },
  },
  {
    path: "/products/:id/edit-product",
    name: "EditProduct",
    component: EditProductsPage,
    meta: {
      title: "Edit Product",
      requiresAuth: true,
    },
  },
  {
    path: "/pages/categories",
    name: "Categories",
    component: Categories,
    meta: {
      title: "Categories",
      requiresAuth: true,
    },
  },
  {
    path: "/categories/add-categories",
    name: "AddCategories",
    component: AddCategoriesPage,
    meta: {
      title: "Add Categories",
      requiresAuth: true,
    },
  },
  {
    path: "/categories/edit-categories",
    name: "EditCategories",
    component: EditCategoriesPage,
    meta: {
      title: "Edit Categories",
      requiresAuth: true,
    },
  },
  {
    path: "/pages/all-orders",
    name: "Orders",
    component: Orders,
    meta: {
      title: "Orders",
      requiresAuth: true,
    },
  },
  {
    path: "/orders/add-orders",
    name: "AddOrders",
    component: AddOrdersPage,
    meta: {
      title: "Add Orders",
      requiresAuth: true,
    },
  },
  {
    path: "/orders/edit-orders",
    name: "EditOrders",
    component: EditOrdersPage,
    meta: {
      title: "Edit Orders",
      requiresAuth: true,
    },
  },
  {
    path: "/Blank",
    name: "Blank Page",
    component: Blank,
    meta: {
      title: "Blank Page",
      requiresAuth: true,
    },
  },

  // Public routes (no authentication required)
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      title: "Login",
      hideNav: true,
    },
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: {
      title: "Register",
      hideNav: true,
    },
  },
  {
    path: "/forgot-password",
    name: "ForgotPassword",
    component: ForgotPassword,
    meta: {
      title: "Forgot Password",
      hideNav: true,
    },
  },

  // Error pages
  {
    path: "/:pathMatch(.*)*",
    name: "Page404",
    component: Page404,
    meta: {
      title: "Upps! 404",
      hideNav: true,
    },
  },
  {
    path: "/500",
    name: "Page500",
    component: Page500,
    meta: {
      title: "Server internal Error",
      hideNav: true,
    },
  },
  {
    path: "/maintenance",
    name: "maintenance",
    component: PageMaintenance,
    meta: {
      title: "Sorry the app has been Maintenance",
      hideNav: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkExactActiveClass: "exact-active",
});

// Authentication check function
function isAuthenticated() {
  const token = localStorage.getItem("token");
  return !!token;
}

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || "iMin-Ecommerce-Dashboard";

  if (to.meta.requiresAuth && !isAuthenticated()) {
    next({ name: "Login" });
  } else if (to.name === "Login" && isAuthenticated()) {
    next({ name: "Dashboard" });
  } else {
    next();
  }
});
export default router;
