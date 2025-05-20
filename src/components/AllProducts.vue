<script setup>
import { onMounted, ref } from "vue";
import DeleteModal from "../components/Button/Products/DeleteProducts.vue";
import api from "@/services/api.js";

const products = ref([]);
const isDeleteModalOpen = ref(false);
const productToDelete = ref(null);
const BASE_URL = "http://127.0.0.1:8000";

const getImageUrl = (imagePath) => {
  // If it's already an absolute URL, return it as is
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath;
  }
  return `${BASE_URL}${imagePath}`;
};

// Fetch products from the API
const fetchProducts = async () => {
  try {
    const response = await api.get("/products");
    products.value = response.data.data.data;
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

const openDeleteModal = (product) => {
  productToDelete.value = product;
  isDeleteModalOpen.value = true;
};

const closeDeleteModal = () => {
  isDeleteModalOpen.value = false;
  productToDelete.value = null;
};

const handleDeleteConfirm = () => {
  // Filter out the product to delete
  products.value = products.value.filter(
    (product) => product.id !== productToDelete.value.id
  );
  closeDeleteModal();
};

onMounted(() => {
  fetchProducts();
});
</script>

<template>
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table
      class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
    >
      <thead
        class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
      >
        <tr>
          <th scope="col" class="px-6 py-3">Product Name</th>
          <th scope="col" class="px-6 py-3">Image</th>
          <th scope="col" class="px-6 py-3">Stock</th>
          <th scope="col" class="px-6 py-3">Category</th>
          <th scope="col" class="px-6 py-3">Price</th>
          <th scope="col" class="px-6 py-3">
            <span class="sr-only">Actions</span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="product in products"
          :key="product.id"
          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
        >
          <th
            scope="row"
            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
            {{ product.name }}
          </th>
          <td class="px-6 py-4">
            <img
              :src="getImageUrl(product.image)"
              :alt="product.name"
              class="h-16 w-16 object-cover rounded"
            />
          </td>
          <td class="px-6 py-4">{{ product.stock }}</td>
          <td class="px-6 py-4">{{ product.category.name }}</td>
          <td class="px-6 py-4">{{ product.price }}</td>
          <td class="px-6 py-4 flex justify-end space-x-4 text-right">
            <router-link
              :to="`/products/${product.id}/edit-product`"
              class="font-medium mt-4 text-blue-600 dark:text-blue-500 hover:underline"
            >
              Edit
            </router-link>
            <button
              @click="openDeleteModal(product)"
              class="font-medium mt-4 text-red-600 dark:text-red-500 hover:underline"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- Use the DeleteModal component -->
  <DeleteModal
    :is-open="isDeleteModalOpen"
    :item-to-delete="productToDelete"
    item-name-field="name"
    @close="closeDeleteModal"
    @confirm="handleDeleteConfirm"
  />
</template>
