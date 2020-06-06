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
import TableTrans from '@/components/client/transaction/TableTrans.vue';
import ModalTrans from '@/components/client/transaction/ModalTrans.vue';

export default {
  name: 'TransPage',
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
    ...mapActions('Transaction', ['getTransactionsByCust']),
    detail(item) {
      this.item = item;
      this.$bvModal.show('modal-detail');
    },
  },
  created() {
    this.getTransactionsByCust();
  },
};
</script>

<style lang="css" scoped></style>
