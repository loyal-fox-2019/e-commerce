<template>
  <div class="containter w-full mx-auto p-2">
    <div class="border border-gray-300 shadow-md rounded p-2 mb-2">
      <div class="flex flex-col md:flex-row justify-between items-center px-4">
        <div
          @click.prevent="openDetails = !openDetails"
          class="md:w-1/3 text-sm text-center underline cursor-pointer">
          5e2c39f944f85f346aae5508
        </div>
        <div class="md:w-1/3 text-sm text-center">Waiting</div>
        <div class="md:w-1/3 text-sm text-center">
          <button
            @click.prevent="changeTransactionStatus('paid')"
            type="button"
            class="border mx-auto block border-gray-700 py-2 px-4 rounded-full hover:bg-blue-600 hover:text-white hover:border-blue-600">
            I have completed payment
          </button>
          <button
            @click.prevent="changeTransactionStatus('deliverd')"
            type="button"
            class="border mx-auto block border-gray-700 py-2 px-4 rounded-full hover:bg-blue-600 hover:text-white hover:border-blue-600">
            Delivered
          </button>
        </div>
      </div>
      <div v-if="openDetails" class="px-4">
        <div>Items: </div>
        <ul class="px-4">
          <li class="text-sm">
            Asteroid 2x (@ Rp. 65000)
          </li>
          <li class="text-sm">
            Asteroid 2x (@ Rp. 65000)
          </li>
        </ul>
        <div class="text-sm py-2">Total: Rp. 90000</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TransactionItem',
  data () {
    return {
      openDetails: false
    }
  },
  methods: {

  }
}
</script>

<style>

</style>