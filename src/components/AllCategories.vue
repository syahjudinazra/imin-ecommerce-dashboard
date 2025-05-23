<script setup>
import { onMounted, ref, watch, computed } from "vue";
import api from "@/services/api.js";
import DeleteModal from "../components/Button/Products/DeleteProducts.vue";

const categories = ref([]);
const isDeleteModalOpen = ref(false);
const productToDelete = ref(null);
const isLoading = ref(false);
const isDeleting = ref(false);

// Pagination
const currentPage = ref(1);
const lastPage = ref(1);
const perPage = ref(5);
const total = ref(0);
const from = ref(null);
const to = ref(null);

// Search and filters
const searchQuery = ref("");
const sortBy = ref("created_at");
const sortOrder = ref("desc");

const BASE_URL = "http://127.0.0.1:8000";

const getImageUrl = (imagePath) => {
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath;
  }
  return `${BASE_URL}${imagePath}`;
};

// Debounced search
const debouncedSearch = ref("");
let searchTimeout = null;

watch(searchQuery, (newValue) => {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    debouncedSearch.value = newValue;
  }, 500); // 500ms delay
});

watch(debouncedSearch, () => {
  currentPage.value = 1; // Reset to first page when searching
  fetchCategories();
});

watch([sortBy, sortOrder, perPage], () => {
  currentPage.value = 1;
  fetchCategories();
});

// Fetch products from the API
const fetchCategories = async (page = 1) => {
  try {
    isLoading.value = true;

    const params = {
      page: page,
      per_page: perPage.value,
      sort_by: sortBy.value,
      sort_order: sortOrder.value,
    };

    if (debouncedSearch.value.trim()) {
      params.search = debouncedSearch.value.trim();
    }

    const response = await api.get("/categories", { params });
    const data = response.data.data;

    categories.value = data.data;
    currentPage.value = data.current_page;
    lastPage.value = data.last_page;
    total.value = data.total;
    from.value = data.from;
    to.value = data.to;
  } catch (error) {
    console.error("Error fetching categories:", error);
    categories.value = [];
  } finally {
    isLoading.value = false;
  }
};

const goToPage = (page) => {
  if (page >= 1 && page <= lastPage.value && page !== currentPage.value) {
    currentPage.value = page;
    fetchCategories(page);
  }
};

const previousPage = () => {
  if (currentPage.value > 1) {
    goToPage(currentPage.value - 1);
  }
};

const nextPage = () => {
  if (currentPage.value < lastPage.value) {
    goToPage(currentPage.value + 1);
  }
};

const clearSearch = () => {
  searchQuery.value = "";
  debouncedSearch.value = "";
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
  products.value = products.value.filter(
    (product) => product.id !== productToDelete.value.id
  );
  total.value = Math.max(0, total.value - 1);
  closeDeleteModal();

  // Refresh the current page if it becomes empty
  if (products.value.length === 0 && currentPage.value > 1) {
    goToPage(currentPage.value - 1);
  }
};

const toggleSort = (field) => {
  if (sortBy.value === field) {
    sortOrder.value = sortOrder.value === "asc" ? "desc" : "asc";
  } else {
    sortBy.value = field;
    sortOrder.value = "asc";
  }
};

const getSortIcon = (field) => {
  if (sortBy.value !== field) return "↕️";
  return sortOrder.value === "asc" ? "↑" : "↓";
};

// Computed properties for pagination display
const pageNumbers = computed(() => {
  const pages = [];
  const maxPagesToShow = 5;
  const startPage = Math.max(
    1,
    currentPage.value - Math.floor(maxPagesToShow / 2)
  );
  const endPage = Math.min(lastPage.value, startPage + maxPagesToShow - 1);

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return pages;
});

const showingText = computed(() => {
  if (total.value === 0) return "No products found";
  return `Showing ${from.value} to ${to.value} of ${total.value} products`;
});

onMounted(() => {
  fetchCategories();
});
</script>

<template>
  <div class="space-y-4">
    <!-- Search and Filter Section -->
    <div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
      <div class="flex flex-col md:flex-row gap-4 items-center justify-between">
        <!-- Search Input -->
        <div class="relative flex-1 max-w-md">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search products..."
            class="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
          />
          <div
            class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
          >
            <svg
              class="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
          <button
            v-if="searchQuery"
            @click="clearSearch"
            class="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            <svg
              class="w-4 h-4 text-gray-400 hover:text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>

        <!-- Per Page Selector -->
        <div class="flex items-center space-x-2">
          <label class="text-sm text-gray-700 dark:text-gray-300">Show:</label>
          <select
            v-model="perPage"
            class="border border-gray-300 dark:border-gray-600 rounded px-3 py-1 text-sm dark:bg-gray-700 dark:text-white"
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Loading Indicator -->
    <div v-if="isLoading" class="flex justify-center py-8">
      <div
        class="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"
      ></div>
    </div>

    <!-- Table -->
    <div v-else class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table
        class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
      >
        <thead
          class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
        >
          <tr>
            <th scope="col" class="px-6 py-3">
              <button
                @click="toggleSort('name')"
                class="flex items-center space-x-1 hover:text-red-600"
              >
                <span>Category Name</span>
                <span class="text-xs">{{ getSortIcon("name") }}</span>
              </button>
            </th>
            <th scope="col" class="px-6 py-3">
              <button
                @click="toggleSort('slug')"
                class="flex items-center space-x-1 hover:text-red-600"
              >
                <span>Slug</span>
                <span class="text-xs">{{ getSortIcon("slug") }}</span>
              </button>
            </th>
            <th scope="col" class="px-6 py-3">
              <span class="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-if="categories.length === 0"
            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
          >
            <td
              colspan="6"
              class="px-6 py-4 text-center text-gray-500 dark:text-gray-400"
            >
              {{
                searchQuery
                  ? "No products found matching your search."
                  : "No products available."
              }}
            </td>
          </tr>
          <tr
            v-else
            v-for="category in categories"
            :key="category.id"
            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
          >
            <th
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              {{ category.name }}
            </th>
            <th
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              {{ category.slug }}
            </th>

            <td class="px-6 py-4 flex justify-end space-x-4 text-right">
              <router-link
                :to="`/categories/${category.id}/edit-categories`"
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

    <!-- Pagination -->
    <div
      v-if="lastPage > 1"
      class="bg-white dark:bg-gray-800 px-4 py-3 border-t border-gray-200 dark:border-gray-700 sm:px-6 rounded-lg"
    >
      <div class="flex items-center justify-between">
        <div class="flex-1 flex justify-between sm:hidden">
          <button
            @click="previousPage"
            :disabled="currentPage === 1"
            class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <button
            @click="nextPage"
            :disabled="currentPage === lastPage"
            class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
        <div
          class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between"
        >
          <div>
            <p class="text-sm text-gray-700 dark:text-gray-300">
              {{ showingText }}
            </p>
          </div>
          <div>
            <nav
              class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
              aria-label="Pagination"
            >
              <button
                @click="previousPage"
                :disabled="currentPage === 1"
                class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600"
              >
                <span class="sr-only">Previous</span>
                <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fill-rule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>

              <button
                v-for="page in pageNumbers"
                :key="page"
                @click="goToPage(page)"
                :class="[
                  'relative inline-flex items-center px-4 py-2 border text-sm font-medium',
                  page === currentPage
                    ? 'z-10 bg-blue-50 border-blue-500 text-blue-600 dark:bg-blue-900 dark:border-blue-400 dark:text-blue-200'
                    : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600',
                ]"
              >
                {{ page }}
              </button>

              <button
                @click="nextPage"
                :disabled="currentPage === lastPage"
                class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600"
              >
                <span class="sr-only">Next</span>
                <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fill-rule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Delete Modal -->
  <DeleteModal
    :is-open="isDeleteModalOpen"
    :item-to-delete="productToDelete"
    :is-loading="isDeleting"
    item-name-field="name"
    delete-endpoint="/products"
    @close="closeDeleteModal"
    @confirm="handleDeleteConfirm"
  />
</template>
