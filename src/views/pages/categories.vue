<template>
  <div class="container mx-auto px-4 sm:px-8">
    <div class="py-8">
      <h2 class="text-2xl font-semibold leading-tight">All Categories</h2>
      <AddCategories />
    </div>
    <AllCategories />
  </div>
</template>

<script>
import AllCategories from "@/components/AllCategories.vue";
import AddCategories from "@/components/Button/Categories/AddCategories.vue";
export default {
  components: {
    AllCategories,
    AddCategories,
  },
};
</script>
