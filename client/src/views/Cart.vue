<template>
  <div class="flex justify-center">
      <div class="w-5/12 mr-5">
        <div class="w-full mt-5" v-for="(product,i) in cart" :key="i">
            <cartItem :product="product"></cartItem>
        </div>
      </div>
      <div v-if="cart.length > 0" class="w-3/12">
        <div class="text-center mt-5">
            <div class="text-4xl font-bold">
                Check Out Now ?
            </div>
            <div class="mt-3 mb-3 text-xl font-bold">
                Your Items
            </div>
            <div v-for="(item,i) in cart" :key="i">
                {{item.item.name}} - x{{item.quantity}}
            </div>
            <div class="flex justify-center underline">
                <div class="font-bold">
                    Total items : 
                </div>
                <div class="ml-2">
                    {{quantity}}
                </div>
            </div>
            <div class="flex justify-center underline">
                <div class="font-bold">
                    Total price : 
                </div>
                <div class="ml-2">
                    {{finalTotal}}
                </div>
            </div>
            <div @click="checkout" class="w-1/4 py-2 my-2 bg bg-white rounded-lg mx-auto border border-blue-500 hover:bg-blue-400 cursor-pointer">
                Check Out
            </div>
        </div>
      </div>
  </div>
</template>

<script>
import cartItem from '../components/cartItem'
import { mapActions, mapState } from 'vuex'

export default {
    components: {
        cartItem
    },
    computed: {
        ...mapState('product',['cart','finalTotal','quantity']),
    },
    methods: {
        ...mapActions('product',['GET_CART','CHECK_OUT']),
        checkout() {
            this.CHECK_OUT()
        }
    },
    created() {
        this.GET_CART()
        console.log(this.cart)
    }
}
</script>

<style scoped>
hr {
    border: 10px solid green;
}
</style>