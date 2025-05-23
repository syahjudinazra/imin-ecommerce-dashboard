<template>
  <div class="container mx-auto px-4 sm:px-8">
    <div class="py-8">
      <h2
        class="text-2xl font-semibold leading-tight text-black dark:text-white"
      >
        Add New Category
      </h2>
    </div>
    <form class="mx-auto" @submit.prevent="saveCategory">
      <div class="relative z-0 w-full mb-5 group">
        <input
          type="text"
          name="name"
          id="name"
          v-model="category.name"
          class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-primary focus:outline-none focus:ring-0 focus:border-primary peer"
          placeholder=" "
          required
        />
        <label
          for="name"
          class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-primary peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >Category Name</label
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
          v-model="category.slug"
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
  name: "CategoryForm",
  data() {
    return {
      category: {
        name: "",
        slug: "",
      },
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
    "category.name": function (newVal) {
      this.category.slug = newVal
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
          this.categories = response.data.data;
        })
        .catch((error) => {
          console.error("Error fetching categories:", error);
        });
    },

    // Save category to database
    saveCategory() {
      this.loading = true;
      this.errors = {};
      this.successMessage = "";

      // Create FormData object for file upload
      const formData = new FormData();
      formData.append("name", this.category.name);
      formData.append("slug", this.category.slug);

      api
        .post("/categories", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          this.loading = false;
          this.successMessage = "Successfully Add New category!";
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
      this.category = {
        name: "",
        slug: "",
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
