<template>
  <div class="container">
    <div v-if="recapList.length === 0">
      <div class="jumbotron flex flex-col">
        <h2 class="mx-auto">Kamu belum ada catatan pembelian</h2>
        <b-button
          style="width:10rem;"
          class="mx-auto mt-2"
          variant="success"
          @click="$router.push('/')"
        >
          Belanja Sekarang
        </b-button>
      </div>
    </div>
    <div v-else>
      <div
        class="bg-gray-200 my-4 row"
        v-for="item in recapList"
        :key="item._id"
      >
        <div
          class="col-sm-12 py-2 bg-gray-400 rounded-t-lg flex justify-between"
        >
          <div class="">
            {{ getDate(item.tanggal) }}
          </div>
          <div class="font-bold text-orange-700 mr-5">
            {{ item.item.seller }}
          </div>
        </div>
        <div class="col-sm-12 col-md-2 flex justify-center py-4 border-r">
          <img
            height="80"
            width="80"
            :src="item.item.gambar"
            :alt="item.item.nama"
          />
        </div>
        <div class="col-sm-2 my-auto border-r">
          <h6 class="text-orange-700 font-bold">{{ item.item.nama }}</h6>
          <h6 class="text-orange-700 font-thin">Rp. {{ item.item.harga }}</h6>
        </div>
        <div class="col-sm-2 my-auto">
          <h6>Total: {{ getTotal(item.item.harga, item.jumlah) }}</h6>
        </div>
      </div>
    </div>
    <!-- <pre>{{ recapList }}</pre> -->
  </div>
</template>

<script>
export default {
  name: 'BuyList',
  created() {
    this.$store.dispatch('getRecapList')
  },
  computed: {
    recapList() {
      return this.$store.state.recapList
    }
  },
  methods: {
    getDate(dateString) {
      let newDate = new Date(dateString).toDateString()
      let date = ''
      for (let i = 4; i < newDate.length; i++) {
        const word = newDate[i]
        date += word
      }
      return date
    },
    getTotal(harga, jumlah) {
      return harga * jumlah
    }
  }
}
</script>

<style></style>
