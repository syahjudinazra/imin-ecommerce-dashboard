<script setup>
import { ref } from "vue";
import DeleteModal from "../components/Button/Products/DeleteProducts.vue";

const isDeleteModalOpen = ref(false);
const orderToDelete = ref(null);

const orders = ref([]);

const openDeleteModal = (order) => {
  orderToDelete.value = order;
  isDeleteModalOpen.value = true;
};

const closeDeleteModal = () => {
  isDeleteModalOpen.value = false;
  orderToDelete.value = null;
};

const handleDeleteConfirm = () => {
  // Filter out the order to delete
  orders.value = orders.value.filter(
    (order) => order.id !== orderToDelete.value.id
  );
  closeDeleteModal();
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
          <th scope="col" class="px-6 py-3">Order Number</th>
          <th scope="col" class="px-6 py-3">Username</th>
          <th scope="col" class="px-6 py-3">Payment Method</th>
          <th scope="col" class="px-6 py-3">Status</th>
          <th scope="col" class="px-6 py-3">
            <span class="sr-only">Actions</span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="order in orders"
          :key="order.id"
          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
        >
          <th
            scope="row"
            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
            {{ order.name }}
          </th>
          <td class="px-6 py-4">{{ order.color }}</td>
          <td class="px-6 py-4">{{ order.category }}</td>
          <td class="px-6 py-4">{{ order.price }}</td>
          <td class="px-6 py-4 flex justify-end space-x-4 text-right">
            <router-link
              to="/orders/edit-order"
              class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
              >Edit</router-link
            >
            <button
              @click="openDeleteModal(order)"
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
    :item-to-delete="orderToDelete"
    item-name-field="name"
    @close="closeDeleteModal"
    @confirm="handleDeleteConfirm"
  />
</template>
