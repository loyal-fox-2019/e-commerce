<template>
  <div class="containter w-full mx-auto">
    <div class="border border-gray-300 shadow-md rounded mb-2 items-center">
      <div class="flex flex-col md:flex-row justify-between items-center px-4">
        <div class="md: w-1/2 flex py-2">
          <div class="flex justify-center shadow-md rounded">
            <img
              class=" hover:grow hover:shadow-lg w-24 h-24"
              src="https://i.imgur.com/uxnbXBa.jpg" >
          </div>
          <div class="flex flex-col justify-between px-4">
            <span class="text-sm">{{ product.name }}</span>
            <span class="text-sm">Rp. {{ product.price }}</span>
            <span class="text-sm">Stock {{ product.stock }}</span>
          </div>
        </div>
        <div class="md:w-1/2 text-sm text-center justify-end flex">
          <button
            @click.prevent="toUpdateForm"
            type="button"
            class="border mx-2 block border-gray-700 py-2 px-4 rounded hover:bg-blue-600 hover:text-white hover:border-blue-600">
            Edit
          </button>
          <button
            @click.prevent="deleteProduct"
            type="button"
            class="border block border-gray-700 py-2 px-4 rounded hover:bg-blue-600 hover:text-white hover:border-blue-600">
            Delete
          </button>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import ProductForm from './ProductForm'
import Swal from 'sweetalert2'
export default {
  name: 'AdminProductDisplay',
  components: {
    ProductForm
  },
  props: ['product'],
  methods: {
    toUpdateForm () {
      this.$router.push(`/admin/update-product/${this.product._id}`)
    },
    deleteProduct() {
      const productId = this.product._id
      Swal.fire({
        text: 'Are you sure?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      })
        .then((result) => {
          if (result.value) {
            this.$store.dispatch('deleteProduct', productId)
          }
        })
    }
  }
}
</script>

<style>

</style>