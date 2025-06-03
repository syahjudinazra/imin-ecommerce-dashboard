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
const toast = ref({
  show: false,
  type: "", // 'success' or 'error'
  message: "",
  timeout: null,
});

const showToast = (type, message, duration = 4000) => {
  // Clear existing timeout
  if (toast.value.timeout) {
    clearTimeout(toast.value.timeout);
  }

  toast.value = {
    show: true,
    type,
    message,
    timeout: null,
  };

  // Auto hide toast after duration
  toast.value.timeout = setTimeout(() => {
    hideToast();
  }, duration);
};

const hideToast = () => {
  toast.value.show = false;
  if (toast.value.timeout) {
    clearTimeout(toast.value.timeout);
    toast.value.timeout = null;
  }
};

const closeModal = () => {
  hideToast(); // Hide toast when modal closes
  emit("close");
};

const confirmDelete = async () => {
  if (!props.itemToDelete || !props.itemToDelete.id) {
    console.error("No item to delete or missing ID");
    showToast("error", "No item selected for deletion");
    return;
  }

  isDeleting.value = true;

  try {
    const response = await api.delete(
      `${props.deleteEndpoint}/${props.itemToDelete.id}`
    );

    // Show success toast
    showToast(
      "success",
      `${props.itemToDelete[props.itemNameField]} deleted successfully`
    );

    emit("deleted", {
      item: props.itemToDelete,
      response: response.data,
    });

    // Close modal after a short delay to show the toast
    setTimeout(() => {
      emit("close");
    }, 1500);
  } catch (error) {
    console.error("Error deleting item:", error);

    const errorMessage =
      error.response?.data?.message || "Failed to delete item";
    showToast("error", errorMessage);

    emit("error", {
      error,
      message: errorMessage,
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
    <!-- Toast Notification -->
    <div
      v-if="toast.show"
      :class="[
        'fixed top-4 right-4 z-[60] max-w-sm w-full rounded-lg shadow-lg transition-all duration-300 transform',
        toast.type === 'success'
          ? 'bg-green-500 text-white'
          : 'bg-red-500 text-white',
      ]"
    >
      <div class="flex items-center p-4">
        <!-- Success Icon -->
        <svg
          v-if="toast.type === 'success'"
          class="w-5 h-5 mr-3 flex-shrink-0"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fill-rule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clip-rule="evenodd"
          />
        </svg>

        <!-- Error Icon -->
        <svg
          v-else
          class="w-5 h-5 mr-3 flex-shrink-0"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fill-rule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
            clip-rule="evenodd"
          />
        </svg>

        <div class="flex-1">
          <p class="text-sm font-medium">{{ toast.message }}</p>
        </div>

        <!-- Close button -->
        <button
          @click="hideToast"
          class="ml-3 text-white hover:text-gray-200 transition-colors"
        >
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>

    <!-- Modal Content -->
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
