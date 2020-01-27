<template>
<div>
<b-container id="cart">
    <h1>Your Cart</h1>
    <CartItems v-for="(cartContent, i) in cartContents" :key="i" :content="cartContent" @minusTotal="changeMinusTotal($event)" @addTotal="changeAddTotal($event)" @CartUpdated="updateCart($event)"></CartItems>
</b-container>
<b-card
    title="Total Cart"
    header-tag="header"
    footer-tag="footer"
    header-bg-variant="warning"
    footer-bg-variant="warning"
    bg-variant="dark"
    text-variant="warning"
    id="total"
    >
      <template v-slot:header>
      </template>
      <b-card-text>Total: {{totalCart}}</b-card-text>
      <b-button variant="warning" @click="checkOut">Proceed to Checkout</b-button>
      <template v-slot:footer>
      </template>
    </b-card>
</div>
</template>

<script>
import CartItems from '../components/CartItems'
import axios from 'axios'
import Swal from 'sweetalert2'
export default {
  name: 'Cart',
  components: {
    CartItems
  },
  data () {
    return {
      cartContents: null,
      totalCart: 0
    }
  },
  methods: {
    changeAddTotal (event) {
      this.totalCart += event
    },
    changeMinusTotal (event) {
      this.totalCart -= event
    },
    updateCart (event) {
      let total = 0
      this.cartContents = event
      event.forEach(item => {
        let totalPrice = Number(item.qty) * Number(item.productId.price)
        // console.log(item.productId.totalPrice)
        total += totalPrice
      })
      this.totalCart = total
    },
    checkOut () {
      axios({
        method: 'delete',
        url: 'http://localhost:3000/cart',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          Swal.fire(
            'CheckOut Success',
            'Your items has successfully been Checked Out',
            'success'
          )
          this.cartContents = null
          this.totalCart = 0
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err
          })
        })
    }
  },
  created () {
    axios({
      method: 'get',
      url: 'http://localhost:3000/cart',
      headers: {
        token: localStorage.getItem('token')
      }
    })
      .then(({ data }) => {
        // console.log(data)
        let total = 0
        this.cartContents = data
        data.forEach(item => {
          let totalPrice = Number(item.qty) * Number(item.productId.price)
          // console.log(item.productId.totalPrice)
          total += totalPrice
        })
        this.totalCart = total
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
</script>

<style scoped>
    #cart {
        height: 65vh;
        color: #FFD300;
        margin-bottom: 0;
        overflow: scroll;
    }
    #total {
        margin-top: 0;
        height: 29vh;
    }
</style>
