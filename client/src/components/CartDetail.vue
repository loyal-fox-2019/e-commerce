<template>
  <div class="container overflow-y" style="max-height: 80vh;">
    <b-modal id="modal-cart" size="lg" title="Cart Detail" hide-footer>
      <div
        class="card mb-3"
        style="max-width: 100vw;"
        v-for="item in cart"
        :key="item._id"
      >
        <div class="row no-gutters">
          <div class="col-md-4">
            <img :src="item.item_id.image" class="card-img" alt="..." />
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">{{ item.item_id.name }}</h5>
              <p class="card-text">Price : Rp {{ item.total_price }}</p>
              <p class="card-text">
                <small class="text-muted">Quantity : {{ item.qty }}</small>
              </p>
              <b-button
                type="button"
                class="mr-2"
                variant="danger"
                @click.prevent="removeItem(item._id)"
                >Remove</b-button
              >
              <b-button
                type="button"
                variant="success"
                @click.prevent="checkoutItem(item)"
                >Checkout</b-button
              >
            </div>
          </div>
        </div>
      </div>
      <b-button
        type="button"
        variant="success"
        @click.prevent="checkoutAll(cart)"
        >Checkout All</b-button
      >
    </b-modal>
  </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
  name: 'CartModal',
  methods: {
    removeItem(id) {
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
          axios
            .delete(`${this.$store.state.baseUrl}/cart/${id}`, {
              headers: { token: localStorage.getItem('token') }
            })
            .then(result => {
              Swal.fire('Deleted!', 'Your file has been deleted.', 'success')
              this.$store.dispatch('FETCH_CART')
            })
            .catch(err => {
              Swal.fire({
                icon: 'error',
                title: 'Oops...' + err.response.status,
                text: err.response.message
              })
            })
        }
      })
    },
    checkoutItem(cart) {
      const id = cart._id
      const data = {
        item_id: cart.item_id,
        qty: cart.qty
      }
      axios
        .post(`${this.$store.state.baseUrl}/cart/transaction/${id}`, data, {
          headers: { token: localStorage.getItem('token') }
        })
        .then(response => {
          Swal.fire('Success!', 'Your Transaction Success', 'success')
          this.$store.dispatch('FETCH_CART')
        })
        .catch(err => {
          console.log(err.response)
          Swal.fire({
            icon: 'error',
            title: 'Oops...' + err.response.status,
            text: err.response.message
          })
        })
    },
    checkoutAll(cart) {
      cart.forEach(el => {
        let id = el._id
        let data = {
          item_id: el.item_id,
          qty: el.qty
        }
        axios
          .post(`${this.$store.state.baseUrl}/cart/transaction/${id}`, data, {
            headers: { token: localStorage.getItem('token') }
          })
          .then(response => {
            Swal.fire('Success!', 'Your Transaction Success', 'success')
            this.$store.dispatch('FETCH_CART')
          })
          .catch(err => {
            console.log(err.response)
            Swal.fire({
              icon: 'error',
              title: 'Oops...' + err.response.status,
              text: err.response.message
            })
          })
      })
    }
  },
  computed: {
    cart() {
      return this.$store.state.cart
    }
  }
}
</script>
