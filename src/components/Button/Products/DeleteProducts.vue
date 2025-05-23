<script setup>
import { defineProps, defineEmits, ref } from "vue";
import api from "@/services/api";

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
  itemToDelete: {
    type: Object,
    default: null,
  },
  itemNameField: {
    type: String,
    default: "name",
  },
  title: {
    type: String,
    default: "Delete Confirmation",
  },
  deleteEndpoint: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["close", "confirm", "deleted", "error"]);

const isDeleting = ref(false);

const closeModal = () => {
  emit("close");
};

const confirmDelete = async () => {
  if (!props.itemToDelete || !props.itemToDelete.id) {
    console.error("No item to delete or missing ID");
    return;
  }

  isDeleting.value = true;

  try {
    const response = await api.delete(
      `${props.deleteEndpoint}/${props.itemToDelete.id}`
    );

    emit("deleted", {
      item: props.itemToDelete,
      response: response.data,
    });

    emit("close");
  } catch (error) {
    console.error("Error deleting item:", error);
    emit("error", {
      error,
      message: error.response?.data?.message || "Failed to delete item",
    });
  } finally {
    isDeleting.value = false;
  }
};
</script>

<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50"
  >
    <div class="relative p-4 w-full max-w-md">
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <button
          @click="closeModal"
          type="button"
          :disabled="isDeleting"
          class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span class="sr-only">Close modal</span>
          <svg
            class="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
        </button>
        <div class="p-6 text-center">
          <svg
            class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            Are you sure you want to delete
            {{ itemToDelete ? itemToDelete[itemNameField] : "" }}?
          </h3>
          <button
            @click="confirmDelete"
            type="button"
            :disabled="isDeleting"
            class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg
              v-if="isDeleting"
              class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
            {{ isDeleting ? "Deleting..." : "Yes, I'm sure" }}
          </button>
          <button
            @click="closeModal"
            type="button"
            :disabled="isDeleting"
            class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            No, cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
