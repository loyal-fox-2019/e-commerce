<template>
  <v-col class="shrink">
    <v-card shaped hover max-width="344" class="mx-auto">
      <v-list-item>
        <v-list-item-avatar color="grey">
          <!-- <v-avatar> -->
            <img :src="product.user.profile_pic" alt="John" />
          <!-- </v-avatar> -->
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="headline">{{product.name}}</v-list-item-title>
          <v-list-item-subtitle>by {{product.user.username}}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <!-- <v-img src="https://selerasa.com/wp-content/uploads/2018/10/tempe-goreng-bumbu-kunyit-500x365-1280x720.jpg" height="194"></v-img> -->
      <v-img :src="product.image" height="194"></v-img>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="headline">Rp. {{product.price}},-</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-card-text v-if="product.user.username == $store.state.username">Stok sekerang: {{product.stock}}</v-card-text>
      <v-card-text>{{product.description}}</v-card-text>

      <v-card-actions>
        <!-- <v-btn text color="blue accent-4">Detail</v-btn> -->
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon>mdi-heart</v-icon>
        </v-btn>
        <v-btn icon v-if="product.user.username != $store.state.username" @click="addToCart">
        <!-- <v-btn icon @click="addToCart"> -->
          <v-icon>shopping_cart</v-icon>
        </v-btn>
        <v-btn icon v-if="product.user.username == $store.state.username" @click="editStock">
        <!-- <v-btn icon @click="addToCart"> -->
          <v-icon>edit</v-icon>
        </v-btn>
        <v-btn icon v-if="product.user.username == $store.state.username" @click="remove">
        <!-- <v-btn icon @click="addToCart"> -->
          <v-icon>delete</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-col>
</template>

<script>
import axios from '../config/api'
export default {
  name: 'ProductItem',
  props: {
    product: Object
  },
  methods: {
    remove () {
      axios({
        method: 'delete',
        url: `/products/${this.product._id}`,
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
          this.$store.dispatch('fetchMyProducts')
        })
        .catch(err => {
          this.$swal({
            position: 'top-end',
            icon: 'error',
            title: err.response.data.message,
            showConfirmButton: false,
            timer: 1500
          })
        })
    },
    editStock () {
      this.$swal({
        title: 'Update stok?',
        text: `stok sekarang: ${this.product.stock}`,
        input: 'number',
        showCancelButton: true,
        confirmButtonText: 'Update',
        showLoaderOnConfirm: true,
        preConfirm: (qty) => {
          return axios({
            method: 'patch',
            url: `/products/${this.product._id}/stock`,
            headers: {
              token: localStorage.getItem('token')
            },
            data: {
              stock: qty
            }
          })
            .catch(error => {
              this.$swal.showValidationMessage(
                `Ga bisa gan: ${error.response.data.message}`
              )
            })
        },
        allowOutsideClick: () => !this.$swal.isLoading()
      })
        .then(({ data }) => {
          this.$store.dispatch('fetchMyProducts')
        })
    },
    addToCart () {
      axios({
        method: 'POST',
        url: `/transactions`,
        data: {
          product: this.product._id,
          quantity: 1
        },
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          this.$swal({
            position: 'top-end',
            icon: 'success',
            title: 'Add to Cart Success',
            showConfirmButton: false,
            timer: 1500
          })
          this.$store.dispatch('fetchPending')
        })
        .catch(err => {
          // console.log(err.response.data.message)
          this.$swal({
            // position: 'top-end',
            icon: 'error',
            title: 'Failed Add to Cart',
            text: err.response.data.message
            // showConfirmButton: false,
            // timer: 1500
          })
        })
    }
  }
}
</script>

<style>

</style>
