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
  // Routes
  {
    path: "/",
    name: "Dashboard",
    component: Dashboard,
    meta: { title: "Dashboard " },
  },

  // Components based Routes
  {
    path: "/pages/all-products",
    name: "AllProducts",
    component: AllProducts,
  },
  {
    path: "/products/add-product",
    name: "AddProduct",
    component: AddProductsPage,
  },
  {
    path: "/products/edit-product",
    name: "EditProduct",
    component: EditProductsPage,
  },
  {
    path: "/pages/categories",
    name: "Categories",
    component: Categories,
  },
  {
    path: "/categories/add-categories",
    name: "AddCategories",
    component: AddCategoriesPage,
  },
  {
    path: "/categories/edit-categories",
    name: "EditCategories",
    component: EditCategoriesPage,
  },
  {
    path: "/pages/all-orders",
    name: "Orders",
    component: Orders,
  },
  {
    path: "/orders/add-orders",
    name: "AddOrders",
    component: AddOrdersPage,
  },
  {
    path: "/orders/edit-orders",
    name: "EditOrders",
    component: EditOrdersPage,
  },
  // layouts

  {
    path: "/Blank",
    name: "Blank Page",
    component: Blank,
    meta: { title: "Blank Page" },
  },

  {
    path: "/auth/login",
    name: "Login",
    component: Login,
    meta: { title: "Login", hideNav: true },
  },
  {
    path: "/auth/register",
    name: "Register",
    component: Register,
    meta: { title: "Register", hideNav: true },
  },
  {
    path: "/auth/forgot-password",
    name: "ForgotPassword",
    component: ForgotPassword,
    meta: { title: "i Forgot Password", hideNav: true },
  },
  // layout/error
  // default page 404
  {
    path: "/:pathMatch(.*)*",
    name: "Page404",
    component: Page404,
    meta: { title: "Upps! 404", hideNav: true },
  },
  {
    path: "/500",
    name: "Page500",
    component: Page500,
    meta: { title: "Server internal Error", hideNav: true },
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

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  next();
});

export default router;
