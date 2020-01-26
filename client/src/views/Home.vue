<template>
  <div class="container-fluid flex flex-col bg-gray-200">
    <div class="container bg-white">
      <div class="jumbotron text-center mt-5">
        <h2 class="text-4xl font-bold">Welcome to JuBel</h2>
        <h2>Katanya Jual Beli Online</h2>
        <h3 class="mt-4">Mulai Peruntunganmu Sekarang</h3>
        <b-button to="/profile/sell-list">
          Mulai Jualan
        </b-button>
      </div>
      <!-- List Jualan -->
      <div class="row">
        <div
          class="my-4 col-sm-6 col-md-4 col-lg-4 col-xl-4"
          v-for="item in invList"
          :key="item._id"
        >
          <Cards :item="item"></Cards>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Cards from '../components/Cards'
export default {
  name: 'home',
  components: {
    Cards
  },
  created() {
    this.$store.dispatch('getInvList')
  },
  computed: {
    invList() {
      this.$store.dispatch('getInvList')
      return this.$store.state.invList
    }
  }
}
</script>
