<template>
  <div class="admin-panel" v-if="this.$store.adminLogin">
    <div class="container p-3 d-flex justify-content-between">
      <h3>Product List</h3>
      <div>
        <button
          class="btn btn-primary mr-3"
          @click="$bvModal.show('bv-addProduct')"
        >
          Add New Product
        </button>
        <button class="btn btn-danger" @click.prevent="exit">
          Exit Cpanel
        </button>
      </div>
    </div>
    <div class="container">
      <ListProduct
        v-for="(product, i) in productData"
        :key="i"
        :item="product"
      ></ListProduct>
    </div>

    <!-- MOdal -->
    <b-modal id="bv-addProduct" centered hide-footer>
      <template v-slot:modal-title>Add New Product</template>
      <div>
        <form enctype="multipart/form-data">
          <div class="form-group">
            <label for="product-name">Product Name</label>
            <input
              type="text"
              class="form-control"
              id="product-name"
              v-model="productName"
            />
          </div>
          <div class="form-group">
            <label for="description">Product Description</label>
            <textarea
              type="text"
              class="form-control"
              id="description"
              v-model="description"
            ></textarea>
          </div>
          <div class="form-row">
            <div class="col-md mb-3">
              <label for="price">Price</label>
              <div class="input-group">
                <div class="input-group-prepend">
                  <span class="input-group-text">Rp</span>
                </div>
                <input
                  type="number"
                  class="form-control"
                  id="price"
                  required
                  autocomplete="off"
                  v-model="price"
                  @keydown="filterKey"
                />
              </div>
            </div>
            <div class="col-md mb-3">
              <label for="stock">Stock</label>
              <input
                type="Number"
                class="form-control"
                id="stock"
                required
                style="width:80%;"
                v-model="stock"
                @keydown="filterKey"
              />
            </div>
          </div>
          <div class="form-group">
            <label for="picture">Product Picture</label>
            <input
              type="file"
              class="form-control-file"
              id="picture"
              @change="upload"
            />
          </div>
          <button class="btn btn-primary btn-add" @click.prevent="addProduct">
            Add Product
          </button>
        </form>
      </div>
    </b-modal>
  </div>
</template>

<script>
import ListProduct from '../components/ListProduct'
import axios from 'axios'
import Swal from 'sweetalert2'
export default {
  components: {
    ListProduct
  },
  computed: {
    productData() {
      return this.$store.state.listProduct
    }
  },
  data() {
    return {
      thumbnail: '',
      productName: '',
      description: '',
      price: '',
      stock: ''
    }
  },
  created() {
    this.$store.dispatch('fetchDataProduct')
  },
  methods: {
    upload() {
      this.thumbnail = event.target.files[0]
    },
    exit() {
      localStorage.clear()
      this.$router.push('/admin')
      this.$store.adminLogin = false
    },
    addProduct() {
      let form = new FormData()
      form.append('productName', this.productName)
      form.append('description', this.description)
      form.append('price', this.price)
      form.append('stock', this.stock)
      form.append('thumbnail', this.thumbnail)

      axios
        .post('http://localhost:3000/products/', form, {
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(success => {
          this.$store.dispatch('fetchDataProduct')
          Swal.fire({
            icon: 'success',
            text: 'Successfuly Add Product'
          })
          this.thumbnail = ''
          this.productName = ''
          this.description = ''
          this.price = ''
          this.stock = ''
          this.$bvModal.hide('bv-addProduct')
        })
        .catch(({ response }) => {
          Swal.fire({
            icon: 'error',
            text: response.data.message
          })
        })
    },
    filterKey(e) {
      const key = e.key
      if (key === '.') return e.preventDefault()
      if (key === 'e') return e.preventDefault()
    }
  }
}
</script>

<style>
.btn-add {
  width: 100%;
}
</style>
