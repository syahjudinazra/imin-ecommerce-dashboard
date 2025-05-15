<script setup>
import { ref } from "vue";
import DeleteModal from "../components/Button/Products/DeleteProducts.vue";

const isDeleteModalOpen = ref(false);
const productToDelete = ref(null);

const products = ref([
  {
    id: 1,
    name: 'Apple MacBook Pro 17"',
    color: "Silver",
    category: "Laptop",
    price: "$2999",
  },
  {
    id: 2,
    name: "Microsoft Surface Pro",
    color: "Black",
    category: "Laptop",
    price: "$1999",
  },
]);

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
  // Here you would typically also make an API call to delete from your backend
};
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
          <th scope="col" class="px-6 py-3">Product name</th>
          <th scope="col" class="px-6 py-3">Color</th>
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
          <td class="px-6 py-4">{{ product.color }}</td>
          <td class="px-6 py-4">{{ product.category }}</td>
          <td class="px-6 py-4">{{ product.price }}</td>
          <td class="px-6 py-4 flex justify-end space-x-4 text-right">
            <router-link
              to="/products/edit-product"
              class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
              >Edit</router-link
            >
            <button
              @click="openDeleteModal(product)"
              class="font-medium text-red-600 dark:text-red-500 hover:underline"
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
