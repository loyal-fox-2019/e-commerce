<template>
  <div class="border border-gray-300 p-4">
    <h4 class="text-lg mb-4 font-bold">Add New Product</h4>
    <form
      @submit.prevent="updateProduct">
      <label class="">
        Product Name:
      </label>
      <input
        v-model="name"
        type="text"
        class="px-2 py-1 mb-4 w-full text-lg border border-gray-400 rounded">
      <label class="">
        Description:
      </label>
      <textarea
        v-model="description"
        type="text"
        class="px-2 py-1 mb-4 w-full text-lg border border-gray-400 rounded"></textarea>
      <label class="">
        Image Link:
      </label>
      <input
        v-model="image"
        type="text"
        class="px-2 py-1 mb-4 w-full text-lg border border-gray-400 rounded">
      <label class="">
        Stock:
      </label>
      <input
        v-model="stock"
        type="number"
        class="px-2 py-1 mb-4 w-full text-lg border border-gray-400 rounded">
      <button
        @click.prevent="updateProduct"
        class="mt-2 border border-gray-600 w-full rounded py-1">
        Submit
      </button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'UpdateProduct',
  data () {
    return {
      id: '',
      name: '',
      description: '',
      price: 0,
      stock: 0,
      image: ''
    }
  },
  methods: {
    updateProduct () {
      const updateObj = {
        id: this.id,
        name: this.name,
        price: this.price,
        stock: this.stock,
        image: this.image
      }
      this.$store.dispatch('updateProduct', updateObj)
      console.log('yaa')
    }
  },
  created () {
    const productId = this.$route.params.productId
    this.$store.dispatch('setUpdateForm', productId)
      .then(data => {
        this.id = data._id,
        this.name = data.name,
        this.description = data.description,
        this.price = data.price,
        this.stock = data.stock,
        this.image = data.image
      })
    
  }
}
</script>

<style>

</style>