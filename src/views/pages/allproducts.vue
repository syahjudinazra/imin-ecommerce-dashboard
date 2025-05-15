<template>
  <div class="container mx-auto px-4 sm:px-8">
    <div class="py-8">
      <h2 class="text-2xl font-semibold leading-tight">All Products</h2>
      <AddProducts />
    </div>
    <AllProducts />
  </div>
</template>

<script>
import AllProducts from "@/components/AllProducts.vue";
import AddProducts from "@/components/Button/Products/AddProducts.vue";
export default {
  components: {
    AllProducts,
    AddProducts,
  },
};
</script>
