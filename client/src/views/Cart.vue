<template>
  <div class="container p-3 cart">
    <div
      class="no-cart p-5 mx-auto"
      v-if="this.$store.state.CartItems.length <= 0"
    >
      <img class="mx-auto" src="../assets/empty-cart.svg" alt="bg" />
      <h5 align="center">You Don't have any Items In Cart</h5>
    </div>
    <div class="row" v-if="this.$store.state.CartItems.length > 0">
      <div class="col-md-7">
        <div class="row justify-content-between shadow p-3 mb-3">
          <h6 class="title-cart">My Cart</h6>
          <h6 class="delete-all" @click="deleteAll">Delete All</h6>
        </div>
        <CartItem
          v-for="(item, i) in getCart"
          :key="i"
          :product="item"
        ></CartItem>
      </div>
      <div class="col-md">
        <div class="total-price d-block mx-auto shadow p-3">
          <h6 class="mb-3">Shopping Summary</h6>
          <div class="divider mb-3"></div>
          <div class="d-flex justify-content-between">
            <p class="total-text mb-3">Total Price</p>
            <p class="price-total mb-3">{{ calculateTotal }}</p>
          </div>
          <button class="btn btn-success btn-checkout" @click="checkout">
            Checkout ({{ totalItem }} Items)
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CartItem from '../components/CartItem'
import Axios from 'axios'
import Swal from 'sweetalert2'
export default {
  components: {
    CartItem
  },
  created() {
    this.$store.dispatch('fetchDataCart')

    if (!localStorage.getItem('token')) {
      this.$router.push('/')
    }
  },
  computed: {
    getCart() {
      return this.$store.state.CartItems
    },
    calculateTotal() {
      let allItem = this.$store.state.CartItems
      let total = 0
      for (let i = 0; i < allItem.length; i++) {
        let allPrice = allItem[i].amount * allItem[i].ProductId.price
        total += allPrice
      }
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR'
      }).format(total)
    },
    totalItem() {
      let totalItems = 0
      for (let i = 0; i < this.$store.state.CartItems.length; i++) {
        totalItems += this.$store.state.CartItems[i].amount
      }
      return totalItems
    }
  },
  methods: {
    checkout() {
      Axios.patch(
        'http://35.185.188.169:3000/cart/',
        {},
        {
          headers: {
            token: localStorage.getItem('token')
          }
        }
      )
        .then(success => {
          Swal.fire({
            icon: 'success',
            title: 'Checkout Succesfull',
            text: 'Thankyou for Shopping with Us'
          })
          this.$store.dispatch('fetchDataCart')
        })
        .catch(err => {
          return err
        })
    },
    deleteAll() {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then(result => {
        if (result.value) {
          Axios.delete('http://35.185.188.169:3000/cart/', {
            headers: {
              token: localStorage.getItem('token')
            }
          }).then(() => {
            this.$store.dispatch('fetchDataCart')
            Swal.fire('Deleted!', 'Cart been deleted.', 'success')
          })
        }
      })
    }
  }
}
</script>

<style>
.no-cart {
  width: 50%;
  display: block;
}
.no-cart img {
  display: block;
}
.title-cart {
  margin-bottom: 0;
}
.delete-all {
  margin-bottom: 0;
  color: #3d941e;
}
.delete-all:hover {
  cursor: pointer;
}
.total-price {
  width: 85%;
}
.btn-checkout {
  background-color: #dc4e1a!Important;
  border: none!Important;
  width: 100%;
  font-weight: 700!Important;
}
.btn-checkout:hover {
  background-color: #cc4f21!Important;
}
.price-total {
  font-size: 14px;
  font-weight: 700;
}
.total-text {
  font-size: 14px;
}
.cart {
  min-height: 94vh;
}
.divider {
  border-bottom: 1px solid #dadada;
}
</style>
