<template>
  <div class="h-screen w-screen vld-parent">
    <Loading
      :active.sync="isLoading"
      :can-cancel="false"
      :is-full-page="true"
    />
    <div class="h-auto px-5 pt-20 pb-5">
      <div class="h-full">
        <div>
          <h1
            class="text-6xl font-hairline tracking-wider text-red-900 capitalize"
          >
            Transaction List
          </h1>
          <router-link
            to="/cart"
            class="border border-red-900 text-red-900 py-1 px-2 texxt-sm font-hairline hover:bg-red-900 hover:text-white rounded-sm"
            >Cart</router-link
          >
          <hr class="my-2" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from 'vue-loading-overlay'

export default {
  name: 'Transaction',
  components: { Loading },
  computed: {
    isLoading() {
      return this.$store.state.isLoading
    },
  },
  created() {
    this.$store.dispatch('fetch_user_transactions')
  },
}
</script>

<style></style>
