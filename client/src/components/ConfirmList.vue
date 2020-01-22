<template>
  <v-container justify="center">
    <v-alert type="error" v-for="(error, i) in errors" :key="i">
      {{error}}
    </v-alert>
    <v-data-table :headers="headers" :items="products" sort-by="name" class="elevation-1">
      <template v-slot:item.action="{ item }">
        <!-- <v-icon small class="mr-2" @click="editItem(item)">edit</v-icon>
        <v-icon small @click="deleteItem(item)">delete</v-icon> -->
        <v-btn rounded small color="accent" @click="confirmItem(item)" dark>Delivered</v-btn>
      </template>
    </v-data-table>
    <div class="text-right my-4">
      <v-btn rounded color="accent" dark>Confirm All</v-btn>
    </div>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import axios from '../config/api'
export default {
  name: 'ConfirmList',
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
    this.products = this.$store.state.paids
    this.$store.watch(
      (state) => state.paids, (newValue, oldValue) => {
        this.products = newValue
      }
    )
  },

  computed: mapState(['paids']),

  methods: {
    confirmItem (payload) {
      axios({
        method: 'PATCH',
        url: `/transactions/${payload._id}/delivered`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          this.$swal({
            position: 'top-end',
            icon: 'success',
            title: 'Confimation success',
            showConfirmButton: false,
            timer: 1500
          })
          this.$store.dispatch('fetchPending')
          this.$store.dispatch('fetchPaid')
        })
        .catch(err => {
          this.errors.push(err.response.data.message)
        })
    },
    initialize () {
      this.products = [
        {
          name: 'Tempe Goreng',
          price: 2500,
          qty: 1,
          subTotal: 2500
        },
        {
          name: 'Tempe Goreng (pedas)',
          price: 2500,
          qty: 2,
          subTotal: 5000
        },
        {
          name: 'Tempe Goreng (pedes)',
          price: 2500,
          qty: 3,
          subTotal: 7500
        },
        {
          name: 'Tempe Goreng (hot)',
          price: 2500,
          qty: 4,
          subTotal: 10000
        }
      ]
    }
  }
}
</script>

<style>
</style>
