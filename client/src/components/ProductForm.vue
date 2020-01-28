<template>
  <div class="border border-gray-300 p-4 mt-2 rounded">
    <h4 class="text-lg mb-4 font-bold">Add New Product</h4>
    <form @submit.prevent="addNewProduct">
      <label class="">
        Product Name:
      </label>
      <input v-model="name" type="text" class="px-2 py-1 mb-4 w-full text-lg border border-gray-400 rounded">
      <label class="">
        Description:
      </label>
      <textarea v-model="description" type="text" class="px-2 py-1 mb-4 w-full text-lg border border-gray-400 rounded"></textarea>
      <label class="">
        Image Link:
      </label>
      <input v-model="image" type="text" class="px-2 py-1 mb-4 w-full text-lg border border-gray-400 rounded">
      <label class="">
        Price:
      </label>
      <input v-model="price" type="number" class="px-2 py-1 mb-4 w-full text-lg border border-gray-400 rounded">
      <label class="">
        Stock:
      </label>
      <input v-model="stock" type="number" class="px-2 py-1 mb-4 w-full text-lg border border-gray-400 rounded">
      <button type="submit" class="mt-2 border border-gray-600 w-full rounded py-1">Submit</button>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'ProductForm',
  data () {
    return {
      name: '',
      description: '',
      image: '',
      price: 0,
      stock: 0
    }
  },
  methods: {
    ...mapActions(['addProduct']),
    addNewProduct () {
      const payload = {
        name: this.name,
        description: this.description,
        image: this.image,
        price: this.price,
        stock: this.stock
      }
      this.addProduct(payload)
    }
  }
}
</script>

<style>

</style>