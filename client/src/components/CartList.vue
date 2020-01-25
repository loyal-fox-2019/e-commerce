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
      <v-btn rounded color="accent" dark @click="purchase">Purchase, Rp. {{totalPurchase}}</v-btn>
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
  computed: {
    ...mapState(['pendings']),
    totalPurchase () {
      let total = null
      this.products.forEach(product => {
        total += product.subTotal
      })
      return total
    }
  },

  methods: {
    deleteItem (payload) {
      this.errors = []
      axios({
        method: 'delete',
        url: `/transactions/${payload._id}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          this.$swal({
            position: 'top-end',
            icon: 'success',
            title: 'Delete Success',
            showConfirmButton: false,
            timer: 1500
          })
          this.$store.dispatch('fetchPending')
        })
        .catch(err => {
          this.errors = err.response.data.message
        })
    },
    editItem (payload) {
      this.$swal({
        title: 'Mau pesen berapa banyak?',
        input: 'number',
        showCancelButton: true,
        confirmButtonText: 'Pesan',
        showLoaderOnConfirm: true,
        preConfirm: (qty) => {
          return axios({
            method: 'patch',
            url: `/transactions/${payload._id}/quantity`,
            headers: {
              token: localStorage.getItem('token')
            },
            data: {
              quantity: qty
            }
          })
            .catch(error => {
              this.$swal.showValidationMessage(
                `Gagal cuy: ${error.response.data.message}`
              )
            })
        },
        allowOutsideClick: () => !this.$swal.isLoading()
      })
        .then(({ data }) => {
          this.$store.dispatch('fetchPending')
        })
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
