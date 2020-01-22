<template>
  <v-container justify="center">
    <v-alert type="error" v-for="(error, i) in errors" :key="i">
      {{error}}
    </v-alert>
    <v-data-table :headers="headers" :items="products" sort-by="name" class="elevation-1">
      <template v-slot:item.action="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)">edit</v-icon>
        <v-icon small @click="deleteItem(item)">delete</v-icon>
      </template>
    </v-data-table>
    <div class="text-right my-4">
      <v-btn rounded color="accent" dark @click="purchase">Purchase</v-btn>
    </div>
  </v-container>
</template>

<script>
import axios from '../config/api'
import { mapState } from 'vuex'
export default {
  name: 'CartList',
  data: () => ({
    errors: [],
    dialog: false,
    headers: [
      {
        text: 'Products name',
        align: 'left',
        value: 'name'
      },
      { text: 'Price', value: 'price' },
      { text: 'Qty', value: 'qty' },
      { text: 'Sub Total', value: 'subTotal' },
      { text: 'Actions', value: 'action', sortable: false }
    ],
    products: []
  }),

  created () {
    this.products = this.$store.state.pendings
    this.$store.watch(
      (state) => state.pendings, (newValue, oldValue) => {
        this.products = newValue
      }
    )
  },
  computed: mapState(['pendings']),

  methods: {
    deleteItem (payload) {
      console.log(payload)
    },
    editItem (payload) {
      console.log(payload)
    },
    purchase () {
      this.errors = []
      axios({
        method: 'PATCH',
        url: `/transactions/purchase`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          this.$swal({
            position: 'top-end',
            icon: 'success',
            title: 'Payment success',
            showConfirmButton: false,
            timer: 1500
          })
          this.$store.dispatch('fetchPending')
          this.$store.dispatch('fetchPaid')
        })
        .catch(err => {
          this.errors = err.response.data.message
        })
    }
  }
}
</script>

<style>
</style>
