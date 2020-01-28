<template>
  <div>
      <div v-if="isLoading">
        <loadingPage></loadingPage>
      </div>
      <div v-else class="flex flex-col">
        <div class="self-center w-3/12">
            <img class="" :src="singleProduct.image" alt="">
        </div>
        <div class="w-7/12 self-center">
            <div class="text-4xl font-bold text-center">
                {{singleProduct.name}}
            </div>
            <div>
                <div class="text-2xl font-bold text-center">Description</div>
                <div class="ml-2">
                    {{singleProduct.description}}
                </div>
            </div>
            <div class="text-center mt-5">
                <div class="text-lg font-bold">Price</div>
                <div class="ml-2 font-bold text-orange-500">
                    Rp. {{singleProduct.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}}
                </div>
            </div>
            <div class="text-center mt-5">
                <div class="text-lg font-bold">Stock</div>
                <div class="ml-2">
                    {{singleProduct.stock}}
                </div>
            </div>
            <div class="text-center mt-5">
                <div class="text-lg font-bold">Quantity</div>
                <select v-model="selected" class="w-1/12 bg bg-white">
                    <option v-for="i in stock" :key="i" :value="i">{{i}}</option>
                </select>
            </div>
        </div>
        <div @click.prevent="addToCart" class="w-1/12 mt-5 my-2 py-2 text-center bg bg-white border-2 border-blue-600 self-center rounded-lg hover:bg-blue-700 cursor-pointer">
            Add To Cart
        </div>
      </div>
  </div>
</template>

<script>
import loadingPage from '../components/loadingPage'
import { mapState, mapActions } from 'vuex'

export default {
    components: {
        loadingPage
    },
    data() {
        return {
            selected: null
        }
    },
    computed: {
        ...mapState(['isLoading']),
        ...mapState('product',['singleProduct']),
        stock() {
            return this.singleProduct.stock
        }
    },
    watch: {
        /* eslint-disable no-unused-vars */
        '$route' (to,from) {
            this.params = to.path
        }
        /* eslint-disable no-unused-vars */
    },
    methods: {
        ...mapActions('product',['GET_SINGLE_PRODUCT','ADD_TO_CART']),
        addToCart() {
            this.ADD_TO_CART({
                productId:this.singleProduct._id,
                quantity: this.selected
            })
        }
    },
    created() {
        this.GET_SINGLE_PRODUCT(this.$route.params.id)
    }
}
</script>

<style>

</style>