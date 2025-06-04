<template>
  <div class="container mx-auto px-4 sm:px-8">
    <div class="py-8">
      <h2 class="text-2xl font-semibold leading-tight">All Orders</h2>
    </div>
    <AllOrders />
  </div>
</template>

<script>
import AllOrders from "@/components/AllOrders.vue";
export default {
  components: {
    AllOrders,
  },
};
</script>
