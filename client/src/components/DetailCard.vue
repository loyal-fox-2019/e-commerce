<template>
  <div>
    <div class="row no-gutters mb-5" style="height: 30vh;">
      <div class="col-md-5">
        <img
          :src="detailItem.image"
          class="card-img"
          alt="itemDetail"
          height="300"
          width="300"
        />
      </div>
      <div class="col-md-7">
        <div class="card-body">
          <h5 class="card-title">{{ detailItem.name }}</h5>
          <p class="card-text">
            {{ detailItem.description }}
          </p>
          <h6 class="card-text">Rp {{ detailItem.price }}</h6>
          <h6 class="card-text">Stocks : {{ detailItem.stocks }}</h6>
          <b-form-input
            id="range-1"
            v-model.number="qty"
            type="range"
            min="0"
            :max="detailItem.stocks"
          ></b-form-input>
          <p>Qty: {{ qty }}</p>
          <b-button
            href="#"
            class="mt-2"
            variant="primary"
            @click.prevent="addToCart(detailItem._id)"
            >Add to Cart</b-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
  data() {
    return {
      image: 'https://picsum.photos/600/300/?image=25',
      qty: 0
    }
  },
  methods: {
    addToCart(id) {
      const total = this.qty * this.detailItem.price

      const data = {
        item_id: id,
        qty: this.qty,
        total_price: total
      }
      axios
        .post(`${this.$store.state.baseUrl}/cart`, data, {
          headers: { token: localStorage.getItem('token') }
        })
        .then(result => {
          Swal.fire('Item added', 'Thank you!', 'success')
          this.$store.dispatch('FETCH_CART')
        })
        .catch(err => {
          console.log(err.response)
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.response.message
          })
        })
    }
  },
  computed: {
    detailItem() {
      return this.$store.state.detailItem
    }
  },
  mounted() {
    this.$store.dispatch('FETCH_CART')
  }
}
</script>

<style lang="css" scoped>
.row {
  height: 60vh;
  margin-bottom: 10vh !important;
}
</style>
