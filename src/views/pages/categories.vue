<template>
  <div class="container mx-auto px-4 sm:px-8">
    <div class="py-8">
      <h2 class="text-2xl font-semibold leading-tight">All Categories</h2>
      <AddCategories />
    </div>
    <AllProducts />
  </div>
</template>

<script>
import AllProducts from "@/components/AllProducts.vue";
import AddCategories from "@/components/Button/Categories/AddCategories.vue";
export default {
  components: {
    AllProducts,
    AddCategories,
  },
};
</script>
