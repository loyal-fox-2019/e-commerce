<template>
  <div>
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
                <tr v-for="(sell,i) in allTransactions" :key="i">
                    <td class="border px-4 py-2">{{i+1}}</td>
                    <td class="border px-4 py-2">{{sell.seller.name}}</td>
                    <td class="border px-4 py-2">{{sell.buyer.name}}</td>
                    <td class="border px-4 py-2">{{sell.item.name}}</td>
                    <td class="border px-4 py-2">Rp. {{sell.item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}}</td>
                    <td class="border px-4 py-2">{{sell.quantity}}</td>
                    <td class="border px-4 py-2">Rp. {{(sell.quantity * sell.item.price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}}</td>
                    <td class="border px-4 py-2">{{sell.status}}</td>
                </tr>
            </tbody>
        </table>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
    computed: {
        ...mapState('product',['allTransactions']),
        // allTransactions() {
        //     return this.$store.state.product.allTransactions
        // }
    },
    methods: {
        ...mapActions('product',['GET_ALL_TRANSACTIONS'])
    },
    created() {
        this.GET_ALL_TRANSACTIONS()
    }
}
</script>

<style>

</style>