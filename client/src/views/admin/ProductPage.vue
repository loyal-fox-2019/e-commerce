<template>
  <div>
    <div>
      <h1 class="title float-left">Products</h1>
      <FormProduct
        :hideModal="modalProductHide"
        :modalDisabled="modalDisabled"
        @modalDisabledFalse="modalDisabledFalse"
      />
    </div>
    <div class="border-title mb-3" style="clear: both;"></div>
    <TableProduct
      :items="products"
      @detailProduct="detailProduct"
      @modalDisabledFalse="modalDisabledFalse"
    />
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex';
import FormProduct from '@/components/admin/product/FormProduct.vue';
import TableProduct from '@/components/admin/product/TableProduct.vue';

export default {
  name: 'Hello',
  data() {
    return {
      modalProductHide: false,
      modalDisabled: false,
    };
  },
  components: {
    TableProduct,
    FormProduct,
  },
  computed: {
    ...mapState('Product', ['products', 'errors', 'success']),
  },
  methods: {
    ...mapActions('Product', ['getProducts']),
    ...mapMutations('Product', ['SET_ERRORS', 'SET_SUCCESS']),
    detailProduct() {
      console.log('detail');
      this.modalDisabled = true;
    },
    modalDisabledFalse() {
      console.log('modalDisabledFalse');
      this.modalDisabled = false;
    },
  },
  watch: {
    errors(msg) {
      if (msg) {
        this.$swal({
          title: 'Error',
          text: msg,
          showCloseButton: true,
        }).then(() => {
          this.SET_ERRORS(null);
        });
      }
    },
    success(data) {
      if (data) {
        if (data.action === 'add' || data.action === 'update') {
          this.modalProductHide = !this.modalProductHide;
        }
        this.$swal({
          title: 'Success',
          text: data.msg,
          showCloseButton: true,
        }).then(() => {
          this.SET_SUCCESS(null);
        });
      }
    },
  },
  created() {
    this.getProducts();
    console.log(this.products);
  },
};
</script>

<style lang="css" scoped></style>
