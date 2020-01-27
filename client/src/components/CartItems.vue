<template>
    <b-card class="mb-3 cartCard">
            <b-card-text style="color:black;">
            <h5>{{content.productId.productName}}</h5>
            <b-row>
              <b-col class="itemDetail">
                <p style="margin-bottom:0;">Total:</p>
                <p>{{totalPrice}}</p>
              </b-col>
              <b-col>
                <p style="margin-bottom:0;">Stock:</p>
                <p>{{content.productId.stock}}</p>
              </b-col>
            </b-row>
            <b-row style="float:left;" align-v="center">
                <b-button pill variant="outline-warning" @click="minAmount"><i class="fas fa-minus"></i></b-button>
                <p class="mx-2" style="margin-bottom:0px;">{{amount}}</p>
                <b-button pill variant="outline-warning" @click="maxAmount"><i class="fas fa-plus"></i></b-button>
            </b-row>
            <b-button variant="danger" style="float:right;" @click="deleteItem(content._id)"><i class="fas fa-trash-alt"></i></b-button>
      </b-card-text>
    </b-card>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'
export default {
  name: 'CartItems',
  data () {
    return {
      price: 50000
    }
  },
  computed: {
    amount () {
      return this.content.qty
    },
    totalPrice () {
      return this.content.qty * this.content.productId.price
    }
  },
  props: {
    content: {
      type: Object
    }
  },
  methods: {
    minAmount () {
      if (this.content.qty <= 1) {
        this.content.qty = 1
        this.totalPrice = this.content.productId.price
      } else {
        this.content.qty -= 1
        this.totalPrice -= this.content.productId.price
        this.$emit('minusTotal', this.content.productId.price)
      }
    },
    maxAmount () {
      if (this.content.qty >= this.content.productId.stock) {
        this.content.qty = this.content.productId.stock
        this.totalPrice = this.content.productId.stock * this.content.productId.price
      } else {
        this.content.qty += 1
        this.totalPrice += this.content.productId.price
        this.$emit('addTotal', this.content.productId.price)
      }
    },
    deleteItem (id) {
      Swal.fire({
        title: 'Are you sure you want to remove this item from your cart?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, I want to remove this item'
      }).then((result) => {
        if (result.value) {
          return axios({
            method: 'delete',
            url: 'http://localhost:3000/cart/' + id,
            headers: {
              token: localStorage.getItem('token')
            }
          })
        }
      })
        .then(({ data }) => {
          Swal.fire(
            'Deleted!',
            'Your Item has been removed from your cart.',
            'success'
          )
          this.$emit('CartUpdated', data)
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err
          })
        })
    }
  }
}
</script>

<style scoped>
    .cartCard {
        width: 100%;
        height: 20vh;
        margin-top: 2%;
        margin-bottom: 1%;
    }
    .itemDetail {
      margin: 0;
    }
</style>
