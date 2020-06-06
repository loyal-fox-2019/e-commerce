<template>
  <div>
    <h1 class="title">Transactions</h1>
    <div class="border-title mb-3" style="clear: both;"></div>
    <table class="table"></table>
    <TableTrans :items="transactions" @detail="detail" />
    <ModalTrans :item="item" />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import TableTrans from '@/components/admin/transaction/TableTrans.vue';
import ModalTrans from '@/components/admin/transaction/ModalTrans.vue';

export default {
  name: 'TransPageAdmin',
  components: {
    TableTrans,
    ModalTrans,
  },
  data() {
    return {
      item: null,
    };
  },
  computed: {
    ...mapState('Transaction', ['transactions']),
  },
  methods: {
    ...mapActions('Transaction', ['getTransactions']),
    detail(item) {
      this.item = item;
      this.$bvModal.show('modal-detail');
    },
  },
  created() {
    this.getTransactions();
  },
};
</script>

<style lang="css" scoped></style>
