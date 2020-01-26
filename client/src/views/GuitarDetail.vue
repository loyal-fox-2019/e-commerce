<template>
  <div class="vld-parent h-screen w-screen">
    <div class="h-auto px-5 pt-20 pb-5">
      <div class="h-full">
        <div>
          <h1
            class="text-6xl font-hairline tracking-wider text-red-900 capitalize"
          >
            {{ guitar.name }}
          </h1>
          <span class="text-lg italic text-gray-700 font-hairline"
            >Item: #{{ guitar._id }}</span
          >
          <hr class="my-2" />
        </div>
      </div>
    </div>
    <div class="flex mt-5 w-screen mx-auto">
      <div class="w-1/3">
        <img :src="guitar.image" />
      </div>
      <div class="w-2/3">
        <div class="mr-24 mt-5">
          <h1 class="text-2xl font-bold mb-3">Product Detail</h1>
          <div class="w-2/3">
            <p class="text-lg font-hairline tracking-wide text-gray-800">
              {{ guitar.description }}
            </p>
            <hr class="my-5" />
            <div v-if="guitar.stock > 0">
              <p class="text-green-500 text-2xl font-medium">
                In Stock &amp; Ready to Ship
              </p>
            </div>
            <div v-else>
              <p class="text-red-500 text-2xl font-medium">
                We Are Sorry Stock is Empty
              </p>
            </div>
            <hr class="my-5" />
            <div>
              <p class="text-md">Price</p>
              <Money
                v-model="guitar.price"
                v-bind="money"
                class="text-red-500 text-xl w-full font-bold"
              />
            </div>
            <hr class="my-5" />
            <div>
              <p class="text-gray-800 text-xl">Amount :</p>
              <VueNumericInput
                v-model="quantity"
                :min="1"
                :max="guitar.stock"
              />
            </div>
            <button
              class="bg-green-500 text-white text-2xl py-2 px-4 rounded-sm mt-5 hover:bg-green-600"
              :class="{
                'opacity-50': guitar.stock == 0,
                'cursor-not-allowed': guitar.stock == 0,
              }"
              @click="addToCart"
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from 'vue-loading-overlay'
import { Money } from 'v-money'
import VueNumericInput from 'vue-numeric-input'
import api from '@/config/api'
import Vue from 'vue'

Vue.use(Loading)

import 'vue-loading-overlay/dist/vue-loading.css'

export default {
  name: 'GuitarDetail',
  components: { Loading, Money, VueNumericInput },
  data: function() {
    return {
      money: {
        decimal: ',',
        thousands: '.',
        prefix: '$',
        suffix: '',
        precisioin: 2,
        masked: false,
      },
      quantity: 1,
    }
  },
  computed: {
    isLoading() {
      return this.$store.state.isLoading
    },
    guitar() {
      return this.$store.state.guitar
    },
    username() {
      return this.$store.state.username
    },
    token() {
      return this.$store.state.token
    },
  },
  watch: {
    $route: {
      immedate: true,
      handler: function(val) {
        this.$store.dispatch('fetch_singel_guitar', {
          guitarId: val.params.guitarId,
        })
      },
    },
  },
  created() {
    this.$store.dispatch('fetch_singel_guitar', {
      guitarId: this.$route.params.guitarId,
    })
  },
  methods: {
    addToCart() {
      if (!this.username) {
        this.$toast.open({
          message: 'Please login first',
          type: 'warning',
          position: 'top-right',
        })
      } else {
        let loader = this.$loading.show({
          container: null,
          canCancel: false,
        })

        api
          .post(
            '/carts/items',
            {
              itemId: this.$route.params.guitarId,
              quantity: this.quantity,
            },
            {
              headers: {
                token: this.token,
              },
            },
          )
          .then(({ data }) => {
            loader.hide()
            this.$toast.open({
              message: 'Added item to chart',
              type: 'info',
              position: 'top-right',
            })
          })
          .catch(err => {
            loader.hide()
            if (err.response) {
              this.$toast.open({
                message: err.response.data.errors,
                type: 'error',
                position: 'top-right',
              })
            } else {
              this.$toast.open({
                message: 'Error has happen, please refresh the page',
                type: 'error',
                position: 'top-right',
              })
            }
          })
      }
    },
  },
}
</script>

<style></style>
