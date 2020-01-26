<template>
  <div>
    <h1 class="title">Carts</h1>
    <div class="border-title mb-3" style="clear: both;"></div>
    <TableCart :items="carts" />
    <div>
      <hr />
      <button type="button" class="btn btn-sm btn-outline-dark float-right mr-5" @click="checkout">
        Checkout
      </button>
      <span class="float-right mr-4">Total payment: {{ totalPayment }} </span>
    </div>
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
    totalPayment() {
      let total = 0;
      this.carts.forEach((cart) => {
        total += cart.totalPrice;
      });
      return total;
    },
  },
  methods: {
    ...mapActions('Cart', ['getCarts']),
    ...mapActions('Transaction', ['createTransaction']),
    checkout() {
      this.$swal
        .fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!. please transfer to rek : 99999999999",
          icon: 'success',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, checkout now!',
        })
        .then((result) => {
          if (result.value) {
            this.createTransaction({ products: this.carts });
            // this.getCarts();
            console.log('yeee');
          }
        });
    },
  },
  mounted() {
    this.getCarts();
  },
};
</script>

<style lang="css" scoped></style>
