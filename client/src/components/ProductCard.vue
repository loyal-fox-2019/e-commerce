<template>
  <div
    class="max-w-sm rounded overflow-hidden shadow-lg mb-10 custom-hover custom-shrink"
    @click.prevent="gotoDetail"
  >
    <img class="w-full" :src="guitar.image" />
    <div class="px-6 py-4">
      <div class="font-bold text-xl mb-2 text-red-900">{{ guitar.name }}</div>
      <p class="text-gray-700 text-base custom-multiline mb-5">
        {{ guitar.description }}
      </p>
      <Money
        v-model="guitar.price"
        v-bind="money"
        class="text-red-500 text-xl text-right w-full font-bold"
      />
    </div>
  </div>
</template>

<script>
import { Money } from 'v-money'

export default {
  name: 'product-card',
  components: { Money },
  props: ['guitar'],
  data: function() {
    return {
      money: {
        decimal: ',',
        thousands: '.',
        prefix: '$',
        suffix: '',
        precision: 2,
        masked: false,
      },
    }
  },
  methods: {
    gotoDetail() {
      this.$router.push(`/guitar/${this.guitar._id}`)
    },
  },
}
</script>

<style scoped>
.custom-multiline {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}

.custom-shrink:hover {
  -webkit-transform: scale(0.99);
  -ms-transform: scale(0.99);
  transform: scale(0.99);
  cursor: pointer;
}
</style>
