<template>
  <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2 w-full mb-6 lg:mb-0 lg:w-1/2 px-4 flex flex-col">
  <img :src="product.image">
  <p class="text-left mb-6">Name: {{ product.name }}<br>
    Description: {{ product.description }}<br>
    Brand: {{ product.brand }}<br>
    Category: {{ product.category }}<br>
    Stock: {{ product.stock }}<br>
    Price: {{ product.price }}<br>
    Weight: {{ product.weight }}<br>
  </p>
  <div>
    <button @click.prevent="toProductForm" type="button" class="px-4 py-2 text-white font-semibold bg-red-500 hover:bg-red-600 border border-transparent rounded focus:outline-none focus:shadow-outline">
      Edit Product
    </button>
    <button  @click.prevent="deleteProduct(product._id)" type="button" class="ml-4 px-4 py-2 text-gray-800 font-semibold bg-white hover:bg-gray-100 border rounded focus:outline-none focus:shadow-outline">
      Delete Product
    </button>
  </div>
  </div>
</template>

<script>
export default {
  name: 'ProductDashboardDetail',
  props: {
    product: Object
  },
  data() {
    return {

    }
  },
  methods: {
    toProductForm() {
      this.$emit('to-product-form')
    },
    deleteProduct(id) {
      console.log(id, 'masuk delete')
      this.$axios.delete(`products/${id}`, {
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          console.log(data)
          this.$emit('fetch-products')
          this.$emit('to-product-form')
          this.$swal.fire({
            title: 'Success!',
            text: 'Product successfully deleted',
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
  }
}
</script>

<style>

</style>