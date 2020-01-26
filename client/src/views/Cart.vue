<template>
  <div class="cart">
    <cartCheckout></cartCheckout>
  </div>
</template>

<script>
// @ is an alias to /src
import cartCheckout from "@/components/cartCheckout.vue";

export default {
  name: "cart",
  components: {
    cartCheckout
  },
  methods: {}
};
</script>
