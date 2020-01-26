<template>
  <div>
    <h1 class="title">Carts</h1>
    <div class="border-title mb-3" style="clear: both;"></div>
    <TableCart :items="carts" />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import TableCart from '@/components/client/cart/TableCart.vue';

export default {
  name: 'CartPage',
  components: {
    TableCart,
  },
  data() {
    return {};
  },
  computed: {
    ...mapState('Cart', ['carts']),
  },
  methods: {
    ...mapActions('Cart', ['getCarts']),
  },
  mounted() {
    this.getCarts();
  },
};
</script>

<style lang="css" scoped></style>
