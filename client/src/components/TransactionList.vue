<template>
  <v-row justify="center" class="d-flex flex-wrap">
    <v-data-table :headers="headers" :items="transactions" sort-by="date" class="elevation-1">
      <template v-slot:item.price="{ item }">
        {{formatPrice(item.price)}}
      </template>
      <template v-slot:item.subTotal="{ item }">
        {{formatPrice(item.subTotal)}}
      </template>
    </v-data-table>
  </v-row>
</template>

<script>
export default {
  name: 'TransactionList',
  data: () => ({
    dialog: false,
    headers: [
      {
        text: 'Customer',
        align: 'left',
        sortable: false,
        value: 'user'
      },
      {
        text: 'Product name',
        align: 'left',
        value: 'name'
      },
      {
        text: 'Purchase Date',
        value: 'date'
      },
      { text: 'Price', value: 'price' },
      { text: 'Qty', value: 'qty' },
      { text: 'Sub Total', value: 'subTotal' }
    ],
    transactions: []
  }),

  created () {
    this.transactions = this.$store.state.delivereds
    this.$store.watch(
      (state) => state.delivereds, (newValue, oldValue) => {
        this.transactions = newValue
      }
    )
  },

  methods: {
    formatPrice (value) {
      let val = (value / 1).toFixed(0).replace('.', ',-')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    },
    initialize () {
      this.transactions = [
        {
          name: 'Tempe Goreng',
          price: 2500,
          qty: 1,
          subTotal: 2500,
          user: 'Amil Hasbala',
          date: new Date().toJSON().slice(0, 10)
        },
        {
          name: 'Tempe Goreng (Pedas)',
          price: 2500,
          qty: 2,
          subTotal: 5000,
          user: 'Amil Hasbala',
          date: new Date().toJSON().slice(0, 10)
        },
        {
          name: 'Tempe Rebus',
          price: 2500,
          qty: 5,
          subTotal: 12500,
          user: 'Bukan Amil Hasbala',
          date: new Date().toJSON().slice(0, 10)
        }
      ]
    }
  }
}
</script>

<style>
</style>
