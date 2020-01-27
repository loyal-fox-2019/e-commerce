<template>
  <div class="rounded-lg shadow-md">
    <div class="bg-white text-gray-800 p-8 border border-grey-600 rounded">
      <h1 class="mb-4 pb-2 text-center text-xl font-bold">{{ product.name }} - <span class="text-red-500">{{ product.brand }}</span></h1>
      <img :src="product.image" class="h-1/2 w-1/2 rounded-lg mb-6 mx-auto">
      <h1 class="border-b mb-4 pb-2 border-gray-300 text-left text-xl font-bold text-red-500">Description</h1>
      <p class="text-left mb-6">{{ product. description }}</p>
      <h1 class="border-b mb-4 pb-2 border-gray-300 text-left text-xl font-bold text-red-500">Details</h1>
      <div mb-6>
        <p class="text-left mb-6">
          Seller: {{ product.seller.name }}<br>
          Stock: {{ product.stock }}<br>
          Price: Rp.{{ product.price }}<br>
          Weight: {{ product.weight }} grams
        </p>
      </div>
      <div v-if="!isSeller">
        <button @click.prevent="addToCart" type="button" class="px-4 py-2 text-white font-semibold bg-red-500 hover:bg-red-600 border border-transparent rounded focus:outline-none focus:shadow-outline">
          Add to cart
        </button>
        <button  @click.prevent="removeFromCart" type="button" class="ml-4 px-4 py-2 text-gray-800 font-semibold bg-white hover:bg-gray-100 border rounded focus:outline-none focus:shadow-outline">
          Remove from cart
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductDetail',
  data() {
    return {
      product: {}
    }
  },
  methods: {
    addToCart() {
      console.log(this.product._id)
      this.$axios({
        method: 'POST',
        url: 'cart',
        headers: {
          access_token: localStorage.getItem('access_token')
        },
        data: {
          product: this.product._id,
          quantity: 1
        }
      })
        .then(({ data }) => {
          console.log(data)
          this.fetchProduct()
          this.$swal.fire({
            title: 'Success!',
            text: 'Product successfully added to cart',
            icon: 'success',
            confirmButtonText: 'Close'
          })
        })
        .catch(err => {
          this.$swal.fire({
            title: 'Error!',
            text: err.response.data.error,
            icon: 'error',
            confirmButtonText: 'Close'
          })
        })
    },
    removeFromCart() {
      this.$axios({
        method: 'PATCH',
        url: 'cart',
        headers: {
          access_token: localStorage.getItem('access_token')
        },
        data: {
          product: this.product._id,
          quantity: 1
        }
      })
        .then(({ data }) => {
          console.log(data)
          this.fetchProduct()
          this.$swal.fire({
            title: 'Success!',
            text: 'Product removed added to cart',
            icon: 'success',
            confirmButtonText: 'Close'
          })
        })
        .catch(err => {
          this.$swal.fire({
            title: 'Error!',
            text: err.response.data.error,
            icon: 'error',
            confirmButtonText: 'Close'
          })
        })
    },
    fetchProduct() {
      this.$axios.get(`products/${this.$route.params.id}`, {
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          console.log(data)
          this.product = data
        })
        .catch(err => {
          this.$swal.fire({
            title: 'Error!',
            text: err.response.data.error,
            icon: 'error',
            confirmButtonText: 'Close'
          })
        })
    }
  },
  mounted() {
    this.fetchProduct()
  },
  computed: {
    isSeller() {
      return String(this.product.seller._id) === String(localStorage.getItem('id'))
    }
  }
}
</script>

<style>

</style>