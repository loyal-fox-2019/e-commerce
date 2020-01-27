<template>
<div class="w-full mb-6 lg:mb-0 lg:w-1/2 px-4 flex flex-col">
    <div class="flex-grow flex flex-col bg-white border-t border-b sm:rounded sm:border shadow overflow-hidden">
      <div class="border-b">
        <div class="flex justify-between px-6 -mb-px">
          <h3 class="text-blue-dark py-4 font-normal text-lg">{{ title }}</h3>
          <div class="flex">
            <button @click.prevent="toProductForm" type="button" class="px-1 py-1 text-white bg-red-500 hover:bg-red-600 border border-transparent rounded focus:outline-none focus:shadow-outline h-10 mt-2">
              Add Product
            </button>
          </div>
        </div>
      </div>

      <table class="table-auto">
        <thead>
          <tr>
            <th class="px-4 py-2">Name</th>
            <th class="px-4 py-2">Price</th>
            <th class="px-4 py-2">Stock</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products" :key="product._id">
            <td class="border px-4 py-2"><a @click="toProductDashboardDetail(product._id)" href="#" class="px-1 py-1 text-red-500 hover:text-red-600 focus:outline-none focus:shadow-outline h-10 mt-2 text-right text-grey">{{ product.name }}</a></td>
            <td class="border px-4 py-2">{{ product.price }}</td>
            <td class="border px-4 py-2">{{ product.stock }}</td>
          </tr>
        </tbody>
      </table>

    </div>
  </div>
</template>

<script>
export default {
  name: "ProductDashboard",
  props: {
    products: Array,
    title: String
  },
  data() {
    return {

    }
  },
  methods: {
    toProductForm() {
      this.$emit('to-product-form')
    },
    toProductDashboardDetail(id) {
      this.$emit('to-product-dashboard-detail', id)
    }
  }
}
</script>

<style>

</style>