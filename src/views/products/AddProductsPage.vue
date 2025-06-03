<template>
  <div class="container mx-auto px-4 sm:px-8">
    <div class="py-8">
      <h2
        class="text-2xl font-semibold leading-tight text-black dark:text-white"
      >
        Add New Produk
      </h2>
    </div>
    <form class="mx-auto" @submit.prevent="saveProduct">
      <div class="relative z-0 w-full mb-5 group">
        <input
          type="text"
          name="name"
          id="name"
          v-model="product.name"
          class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-primary focus:outline-none focus:ring-0 focus:border-primary peer"
          placeholder=" "
          required
        />
        <label
          for="name"
          class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-primary peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >Product Name</label
        >
        <span v-if="errors.name" class="text-red-500 text-xs">{{
          errors.name[0]
        }}</span>
      </div>

      <div class="relative z-0 w-full mb-5 group">
        <input
          type="text"
          name="slug"
          id="slug"
          v-model="product.slug"
          class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-primary focus:outline-none focus:ring-0 focus:border-primary peer"
          placeholder=" "
          required
        />
        <label
          for="slug"
          class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-primary peer-focus:dark:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >Slug</label
        >
        <span v-if="errors.slug" class="text-red-500 text-xs">{{
          errors.slug[0]
        }}</span>
      </div>

      <div class="grid md:grid-cols-2 md:gap-6">
        <div class="relative z-0 w-full mb-5 group">
          <input
            type="number"
            name="price"
            id="price"
            v-model="product.price"
            step="0.01"
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-primary focus:outline-none focus:ring-0 focus:border-primary peer"
            placeholder=" "
            required
          />
          <label
            for="price"
            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-primary peer-focus:dark:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >Price</label
          >
          <span v-if="errors.price" class="text-red-500 text-xs">{{
            errors.price[0]
          }}</span>
        </div>

        <div class="relative z-0 w-full mb-5 group">
          <input
            type="number"
            name="stock"
            id="stock"
            v-model="product.stock"
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-primary focus:outline-none focus:ring-0 focus:border-primary peer"
            placeholder=" "
            required
          />
          <label
            for="stock"
            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-primary peer-focus:dark:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >Stock</label
          >
          <span v-if="errors.stock" class="text-red-500 text-xs">{{
            errors.stock[0]
          }}</span>
        </div>
      </div>

      <div class="relative z-0 w-full mb-5 group">
        <select
          name="category_id"
          id="category_id"
          v-model="product.category_id"
          class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-primary focus:outline-none focus:ring-0 focus:border-primary peer"
          required
        >
          <option value="" disabled selected>Select categories</option>
          <option
            v-for="category in categories"
            :key="category.id"
            :value="category.id"
          >
            {{ category.name }}
          </option>
        </select>
        <label
          for="category_id"
          class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-primary peer-focus:dark:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >Categories</label
        >
        <span v-if="errors.category_id" class="text-red-500 text-xs">{{
          errors.category_id[0]
        }}</span>
      </div>

      <div class="relative z-0 w-full mb-5 group">
        <textarea
          name="description"
          id="description"
          v-model="product.description"
          rows="4"
          class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-primary focus:outline-none focus:ring-0 focus:border-primary peer"
          placeholder=" "
        ></textarea>
        <label
          for="description"
          class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-primary peer-focus:dark:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >Description</label
        >
        <span v-if="errors.description" class="text-red-500 text-xs">{{
          errors.description[0]
        }}</span>
      </div>

      <div class="relative z-0 w-full mb-5 group">
        <input
          type="file"
          name="image"
          id="image"
          @change="handleImageUpload"
          accept="image/jpeg,image/png,image/jpg"
          class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
        />
        <label
          for="image"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Product Image (JPG, JPEG, PNG maks. 2MB)</label
        >
        <span v-if="errors.image" class="text-red-500 text-xs">{{
          errors.image[0]
        }}</span>
      </div>

      <div
        v-if="successMessage"
        class="mb-5 p-4 rounded-lg bg-green-100 text-green-700"
      >
        {{ successMessage }}
      </div>

      <button
        type="submit"
        :disabled="loading"
        class="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-primary dark:hover:bg-gray-700 dark:focus:ring-gray-800 disabled:opacity-50"
      >
        Submit
      </button>
    </form>
  </div>
</template>

<script>
import api from "@/services/api";

export default {
  name: "ProductForm",
  data() {
    return {
      product: {
        name: "",
        slug: "",
        price: "",
        stock: "",
        description: "",
        category_id: "",
        image: null,
      },
      categories: [],
      errors: {},
      loading: false,
      successMessage: "",
    };
  },
  mounted() {
    this.fetchCategories();
  },
  watch: {
    // Auto-generate slug from name
    "product.name": function (newVal) {
      this.product.slug = newVal
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w\-]+/g, "")
        .replace(/\-\-+/g, "-")
        .replace(/^-+/, "")
        .replace(/-+$/, "");
    },
  },
  methods: {
    fetchCategories() {
      api
        .get("/categories")
        .then((response) => {
          this.categories = response.data.data.data;
        })
        .catch((error) => {
          console.error("Error fetching categories:", error);
        });
    },

    // Handle file upload
    handleImageUpload(event) {
      this.product.image = event.target.files[0];
    },

    // Save product to database
    saveProduct() {
      this.loading = true;
      this.errors = {};
      this.successMessage = "";

      // Create FormData object for file upload
      const formData = new FormData();
      formData.append("name", this.product.name);
      formData.append("slug", this.product.slug);
      formData.append("price", this.product.price);
      formData.append("stock", this.product.stock);
      formData.append("category_id", this.product.category_id);

      // Only append these if they exist
      if (this.product.description) {
        formData.append("description", this.product.description);
      }

      if (this.product.image) {
        formData.append("image", this.product.image);
      }

      api
        .post("/products", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          this.loading = false;
          this.successMessage = "Successfully Add New Product!";
          this.resetForm();
        })
        .catch((error) => {
          this.loading = false;
          if (
            error.response &&
            error.response.data &&
            error.response.data.errors
          ) {
            this.errors = error.response.data.errors;
          } else if (
            error.response &&
            error.response.data &&
            error.response.data.message
          ) {
            this.errors = { general: [error.response.data.message] };
          } else {
            this.errors = {
              general: ["An error occurred. Please try again."],
            };
          }
        });
    },

    // Reset form after successful submission
    resetForm() {
      this.product = {
        name: "",
        slug: "",
        price: "",
        stock: "",
        description: "",
        category_id: "",
        image: null,
      };

      // Reset file input
      const fileInput = document.getElementById("image");
      if (fileInput) {
        fileInput.value = "";
      }
    },
  },
};
</script>
