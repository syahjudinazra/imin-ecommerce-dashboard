<template>
  <div class="container mx-auto px-4 sm:px-8">
    <div class="py-8">
      <h2 class="text-2xl font-semibold leading-tight">All Orders</h2>
      <AddOrders />
    </div>
    <AllProducts />
  </div>
</template>

<script>
import AllProducts from "@/components/AllProducts.vue";
import AddOrders from "@/components/Button/Orders/AddOrders.vue";
export default {
  components: {
    AllProducts,
    AddOrders,
  },
};
</script>
