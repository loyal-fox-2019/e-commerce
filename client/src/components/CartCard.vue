<template>
  <div
    class="flex w-full h-64 border border-red-900 mb-5 rounded-sm vld-parent"
  >
    <Loading
      :active.sync="isLoading"
      :can-cancel="false"
      :is-full-page="true"
    />
    <div class="w-4/12">
      <img :src="item.image" class="h-full" />
    </div>
    <div class="flex-1 pt-3 pr-16">
      <div class="text-gray-900 font-bold text-xl mb-2">
        {{ item.name }}
      </div>
      <p class="text-gray-700 text-base custom-multiline">
        {{ item.description }}
      </p>
      <p class="mt-5">Quantity :</p>
      <VueNumericInput v-model="oldQuantity" :min="1" :max="item.stock" />
      <div class="mt-8">
        <button
          class="bg-red-500 py-1 px-2 text-white hover:bg-red-700 rounded-sm"
          @click="removeItem"
        >
          <span class="fas fa-trash"></span>
        </button>
        <button
          class="bg-teal-500 py-1 px-2 text-white hover:bg-teal-700 rounded-sm ml-2"
          @click="updateItem"
          v-if="showEdit"
        >
          <span class="fas fa-pen-square"></span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from 'vue-loading-overlay'
import VueNumericInput from 'vue-numeric-input'

import 'vue-loading-overlay/dist/vue-loading.css'

export default {
  name: 'cart-card',
  components: { VueNumericInput, Loading },
  props: ['item', 'quantity'],
  data: function() {
    return {
      oldQuantity: this.quantity,
      showEdit: false,
    }
  },
  computed: {
    isLoading() {
      return this.$store.state.isLoading
    },
  },
  watch: {
    oldQuantity(val) {
      if (this.quantity == val) this.showEdit = false
      else this.showEdit = true
    },
  },
  methods: {
    removeItem() {
      this.$store.dispatch('remove_item_from_cart', { itemId: this.item._id })
    },
    updateItem() {
      this.$store.dispatch('update_item_in_cart', {
        itemId: this.item._id,
        quantity: this.oldQuantity,
      })
    },
  },
}
</script>

<style scoped>
.custom-multiline {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
</style>
