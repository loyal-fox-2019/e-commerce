<template>
  <div class="col-md-12 mt-5">
    <div class="t-list-wrapper">
      <TransactionList v-for="item in transaction" :itemTransaction="item" :key="item._id" />
    </div>
  </div>
</template>

<script>
import TransactionList from '@/components/TransactionList.vue'

export default {
  components: {
    TransactionList
  },
  methods: {
    fetchTransaction () {
      this.$store.dispatch('FETCH_TRANSACTION')
    }
  },
  computed: {
    transaction () {
      console.log(this.$store.state.transaction)
      return this.$store.state.transaction
    }
  },
  created: {

  }
}
</script>

<style>
.t-list-wrapper {
  width: 600px;
  margin: auto;
}
</style>
