<template>
<div class="flex">
  <div class="product w-10/12 mx-auto">
      <div class="flex">
          <div v-for="product in products" :key="product._id" class="flex-wrap w-48 my-3 mx-3 rounded overflow-hidden shadow-xl">
            <img class="w-full h-40" :src="product.image" alt="Sunset in the mountains">
              <div class="px-6 py-4 bg bg-white">
                <div class="font-bold text-xl mb-2 hover:text-blue-700 cursor-pointer">
                  <router-link :to="{ path: `/${product._id}`}">
                    {{product.name}}
                  </router-link>
                </div>
                <p class="text-gray-700 text-base">
                    Rp. {{product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}}
                </p>
                <p v-if="product.seller" class="text-gray-700 text-base">{{product.seller.name}}</p>
                <div v-if="profile" class="flex mt-2 justify-center">
                  <div class="px-2 py-1 bg bg-blue-500 mr-1" @click.prevent="update(product._id,product.name,product.description,product.image,product.price,product.stock)">Update</div>
                  <div @click="deleteProduct(product._id)" class="px-2 py-1 bg bg-red-500 ml-1">Delete</div>
                </div>
            </div>
          </div>
      </div>
      <div v-if="updateData.stock" class="mx-auto w-1/2">
        <form class="bg-white shadow-xl rounded px-8 pt-6 pb-8 mb-4">
          <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="product-name">
                  Product Name
              </label>
              <input v-model="updateData.name" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="product-name" type="text" placeholder="product-name">
          </div>
          <!-- <div class="mb-6">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="Image">
                  Image
              </label>
              <input @change="setImage" class="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="Image" type="file" placeholder="input image">
          </div> -->
          <div class="mb-6">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="Image">
                  Description
              </label>
              <textarea v-model="updateData.description" class="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" rows="5" id="description"  placeholder="input description">
              </textarea>
          </div>
          <div class="mb-6">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="Image">
                  Price
              </label>
              <input v-model="updateData.price" class="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="price" type="number" placeholder="Input price">
          </div>
          <div class="mb-6">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="Image">
                  Stock
              </label>
              <input v-model="updateData.stock" class="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="stock" type="number" placeholder="Input stock">
          </div>
          <div class="flex">
              <button @click.prevent="updateProduct" class="justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                  Update Product
              </button>
          </div>
      </form>
      </div>
  </div>
</div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
import axios from '../helpers/baseRoute'

export default {
    props:['products','profile'],
    data() {
      return {
        updateData: {
          name: '',
          description: '',
          price: '',
          stock: ''
        }
      }
    },
    methods: {
      ...mapActions('product',['UPDATE_PRODUCT','GET_USER_PRODUCTS']),
      ...mapMutations('product',['setUpdateData']),
      update(id,name,description,image,price,stock) {
        this.updateData = {
          id: id,
          name: name,
          description: description,
          price: price,
          stock: stock
        }
      },
      updateProduct() {
        this.UPDATE_PRODUCT({
          id: this.updateData.id,
          name: this.updateData.name,
          description: this.updateData.description,
          price: this.updateData.price,
          stock: this.updateData.stock
        })
      },
      deleteProduct(id) {
        axios({
          method: 'delete',
          url: `/product/${id}`,
          headers: {
            token: localStorage.getItem('token')
          }
        })
          .then( () => {
            this.$swal.fire({
              icon: 'success',
              title: 'Deleted',
              showConfirmButton: false,
              timer: 1500
            })
            this.GET_USER_PRODUCTS()
          })
          .catch( err => {
            this.$swal.fire({
              icon: 'error',
              title: err.response.data.errors,
              showConfirmButton: false,
              timer: 1500
            })
          })
      }
    }
}
</script>

<style>

</style>