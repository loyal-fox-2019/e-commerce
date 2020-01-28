<template>
  <div>
      <div v-if="isLoading">
          <loadingPage></loadingPage>
      </div>
      <div v-else class="flex flex-col">
          <div class="w-full mt-5 text-center">
            <div class="text-2xl font-bold underline">
                SELL TRANSACTIONS
            </div>
            <table class="table-auto mx-auto">
                <thead>
                    <tr>
                        <th class="px-4 py-2">No.</th>
                        <th class="px-4 py-2">Seller</th>
                        <th class="px-4 py-2">Buyer</th>
                        <th class="px-4 py-2">Item</th>
                        <th class="px-4 py-2">Price</th>
                        <th class="px-4 py-2">Quantity</th>
                        <th class="px-4 py-2">Total</th>
                        <th class="px-4 py-2">Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(sell,i) in sellTransaction" :key="i">
                        <td class="border px-4 py-2">{{i+1}}</td>
                        <td class="border px-4 py-2">{{sell.seller.name}}</td>
                        <td class="border px-4 py-2">{{sell.buyer.name}}</td>
                        <td class="border px-4 py-2">{{sell.item.name}}</td>
                        <td class="border px-4 py-2">Rp. {{sell.item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}}</td>
                        <td class="border px-4 py-2">{{sell.quantity}}</td>
                        <td class="border px-4 py-2">Rp. {{(sell.quantity * sell.item.price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}}</td>
                        <td v-if="sell.status==='Waiting for shipping'" class="border px-4 py-2">
                            <div @click="updateStatus({status:'Shipping',id:sell._id})" class="bg bg-white text text-black px-1 py-1 rounded-lg border-2 border-gray-800 hover:bg-gray-900 cursor-pointer hover:text-white ">
                                Ship Now
                            </div>
                        </td>
                        <td v-else class="border px-4 py-2">{{sell.status}}</td>
                    </tr>
                </tbody>
            </table>
          </div>
          <div class="w-full mt-24">
              <div class="text-2xl text-center font-bold underline">
                    BUY TRANSACTIONS
                </div>
                <table class="table-auto mx-auto">
                    <thead>
                        <tr>
                            <th class="px-4 py-2">No.</th>
                            <th class="px-4 py-2">Buyer</th>
                            <th class="px-4 py-2">Seller</th>
                            <th class="px-4 py-2">Item</th>
                            <th class="px-4 py-2">Price</th>
                            <th class="px-4 py-2">Quantity</th>
                            <th class="px-4 py-2">Total</th>
                            <th class="px-4 py-2">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(buy,i) in buyTransaction" :key="i">
                            <td class="border px-4 py-2">{{i+1}}</td>
                            <td class="border px-4 py-2">{{buy.buyer.name}}</td>
                            <td class="border px-4 py-2">{{buy.seller.name}}</td>
                            <td class="border px-4 py-2">{{buy.item.name}}</td>
                            <td class="border px-4 py-2">Rp. {{buy.item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}}</td>
                            <td class="border px-4 py-2">{{buy.quantity}}</td>
                            <td class="border px-4 py-2">Rp. {{(buy.quantity * buy.item.price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}}</td>
                            <td v-if="buy.status==='Shipping'" class="border px-4 py-2">
                                <div @click="updateStatus({status:'Done',id:buy._id})" class="text-center bg bg-white text text-black px-1 py-1 rounded-lg border-2 border-gray-800 hover:bg-gray-900 cursor-pointer hover:text-white ">
                                    Done
                                </div>
                            </td>
                            <td v-else class="border px-4 py-2">{{buy.status}}</td>
                        </tr>
                    </tbody>
                </table>
          </div>
      </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import loadingPage from '../components/loadingPage'

export default {
    components: {
        loadingPage
    },
    methods: {
        ...mapActions('product',['GET_SELL','GET_BUY','UPDATE_STATUS']),
        updateStatus(payload) {
            this.UPDATE_STATUS(payload)
        }
    },
    computed: {
        ...mapState(['isLoading']),
        ...mapState('product',['sellTransaction','buyTransaction'])
    },
    created() {
        this.GET_SELL()
        this.GET_BUY()
    }
}
</script>

<style>

</style>