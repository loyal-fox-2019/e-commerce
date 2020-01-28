<template>
  <div class="add-product">
      <!-- <div class="w-full max-w-md">
        <form class="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="product-name">
                    Product Name
                </label>
                <input v-model="name" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="product-name" type="text" placeholder="product-name">
            </div>
            <div class="mb-6">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="Image">
                    Image
                </label>
                <input v-model="image" class="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="Image" type="text" placeholder="input image">
            </div>
            <div class="mb-6">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="Image">
                    Price
                </label>
                <input v-model="price" class="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="price" type="number" placeholder="Input price">
            </div>
            <div class="mb-6">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="Image">
                    Stock
                </label>
                <input v-model="stock" class="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="stock" type="number" placeholder="Input stock">
            </div>
            <div class="flex items-center justify-between">
                <button @click.prevent="addProduct" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                    Add Product
                </button>
            </div>
        </form>
      </div> -->
      <inputForm :add="true"></inputForm>
  </div>
</template>

<script>
import inputForm from '../components/inputForm'

export default {
    components: {
        inputForm
    },  
}
</script>

<style>

</style>
                // addProduct() {
                //     axios({
                //         method: 'post',
                //         url:'/product',
                //         data: {
                //             name: this.name,
                //             image: this.image,
                //             price: this.price,
                //             stock: this.stock
                //         },
                //         headers: { token: localStorage.getItem('token')}
                //     })
                //         .then( ({data}) => {
                //             this.$swal.fire({
                //                 icon: 'success',
                //                 title: `Product ${data.name} added.`,
                //                 showConfirmButton: false,
                //                 timer: 1500
                //             })
                //             this.$router.push({path: '/'})
                //         })
                //         .catch( err => {
                //             this.$swal.fire({
                //                 icon: 'error',
                //                 title: err.response.data.errors,
                //                 showConfirmButton: false,
                //                 timer: 1500
                //             })
                //         })