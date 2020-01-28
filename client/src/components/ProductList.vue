<template>
  <div class="product-wrapper">
    <div class="product-body" @click="addToCart(product._id)">
      <img :src="product.image">
      <div class="caption">
        <div class="product-name"><h4>{{ product.name }}</h4></div>
        <div>Price: {{ product.price }}</div>
        <div>Stock: {{ product.stock }}</div>
      </div>
      <div class="button-wrapper">
        <b-button @click="addToCart(product._id)">Add</b-button>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
import server from '@/helpers/server'

export default {
  props: ['product'],
  methods: {
    async addToCart (productId) {
      if (!localStorage.getItem('token')) {
        Swal.fire('You need to login to add product to cart!')
      } else {
        const { value: quantity } = await Swal.fire({
          title: 'How many you want to add to cart?',
          input: 'text',
          inputPlaceholder: `Current Stock: ${this.product.stock}`,
          showCancelButton: true,
          inputValidator: (value) => {
            if (!value) {
              return 'You need to write something!'
            } else if (value > this.product.stock) {
              return `There is only ${this.product.stock} items left!`
            }
          }
        })
        if (quantity) {
          server({
            url: '/cart',
            method: 'PATCH',
            data: {
              productId,
              quantity
            },
            headers: {
              token: localStorage.getItem('token')
            }
          })
            .then(result => {
              this.$store.dispatch('FETCH_CART')
              Swal.fire(`Your item has added to cart`)
            })
            .catch(err => {
              Swal.fire(err.response.data.message)
            })
        }
      }
    }
  }
}
</script>

<style scoped>
.single-item {
  border: 1px dashed crimson;
}
.product-wrapper {
  margin-bottom: 1.4rem;
}
.product-body {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 100%;
  border: 1px solid #aaaaaa;
  border-radius: 8px;
  padding: 2rem;
  cursor: pointer;
}
.product-body:hover {
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  transition: 0.4s box-shadow;
}
.product-name {
  height: 4rem;
}
.product-wrapper img {
  width: 100%;
  margin-bottom: 0.6rem;
}
.caption {
  margin-top: auto;
  text-align: left;
  width: 100%;
}
.button-wrapper {

}
</style>
