<template>
 <b-container>
     <b-button variant="warning" v-b-modal.addProductModal id="newProductButton">Add Product</b-button>
        <b-modal  id="addProductModal" title="Add Product" hide-footer>
          <b-form @submit.prevent="createProduct">
            <b-form-group
        id="productName-group"
        label="Product Name:"
        label-for="productNameInput"
      >
        <b-form-input
          id="productNameInput"
          v-model="form.productName"
          type="text"
          required
          placeholder="Enter product name"
        ></b-form-input>
      </b-form-group>
      <b-form-group
        id="productImage-group"
        label="Product Image:"
        label-for="productImageInput"
      >
        <b-form-file
        v-model="file"
        :state="Boolean(file)"
        @change="onFileChange"
        placeholder="Choose an image or drop it here..."
        drop-placeholder="Drop file here..."
        ></b-form-file>
      </b-form-group>
      <b-form-group
        id="productDesc-group"
        label="Product Description:"
        label-for="productDescInput"
      >
        <b-form-textarea
        id="productDescInput"
        v-model="form.productDesc"
        placeholder="Enter product description..."
        rows="3"
        max-rows="6"
        ></b-form-textarea>
      </b-form-group>
      <b-form-group
        id="productPrice-group"
        label="Product price:"
        label-for="productPriceInput"
      >
        <b-form-input
          id="productPriceInput"
          v-model="form.productPrice"
          type="number"
          required
          placeholder="Enter product price"
        ></b-form-input>
      </b-form-group>
      <b-form-group
        id="productStock-group"
        label="Product stock:"
        label-for="productStockInput"
      >
        <b-form-input
          id="productStockInput"
          v-model="form.productStock"
          type="number"
          required
          placeholder="Enter product stock"
        ></b-form-input>
      </b-form-group>
      <b-form-group id="productCategory-group" label="Category:" label-for="productCategoryInput">
        <b-form-select
          id="productCategoryInput"
          v-model="form.productCategory"
          :options="categories"
          required
        ></b-form-select>
      </b-form-group>
      <b-button block variant="warning" type="submit" @click="$bvModal.hide('addProductModal')">Add Product</b-button>
        </b-form>
        </b-modal>
     <SearchBar></SearchBar>
     <b-button class="my-2" @click="changeCat('all')">all products</b-button>
     <b-row align-h="center">
         <b-button class="mx-1" v-for="(category, i) in categories" :key="i" @click="changeCat(category)">{{category}}</b-button>
     </b-row>
     <b-row align-h="around" class="my-2" id="mainAdmin">
         <AdminProductCards v-for="(product, i) in filterProducts" :key="i" :productDetails="product" @productUpdate="productUpdated($event)"></AdminProductCards>
     </b-row>
 </b-container>
</template>

<script>
import SearchBar from '../components/SearchBar'
import AdminProductCards from '../components/AdminProductCards'
import axios from 'axios'
import Swal from 'sweetalert2'
export default {
  name: 'Admin',
  components: {
    SearchBar,
    AdminProductCards
  },
  props: {
    products: {
      type: Array
    }
  },
  data () {
    return {
      file: null,
      form: {
        productName: '',
        productDesc: '',
        productPrice: 0,
        productStock: 0,
        productCategory: ''
      },
      categories: ['Playstation', 'Xbox', 'Switch', 'Steam', 'Accessories', 'Custom', 'Collectibles'],
      clicked: 'all'
    }
  },
  computed: {
    filterProducts () {
      if (this.clicked === 'all') {
        return this.products
      } else {
        return this.products.filter(element =>
          element.category === this.clicked
        )
      }
    }
  },
  methods: {
    productUpdated (event) {
      this.products = event
      // console.log(event)
    },
    onFileChange () {
      this.file = event.target.files[0]
    },
    changeCat (category) {
      this.clicked = category
    },
    createProduct () {
      let data = new FormData()
      data.append('productName', this.form.productName)
      data.append('productImage', this.file)
      data.append('description', this.form.productDesc)
      data.append('price', this.form.productPrice)
      data.append('stock', this.form.productStock)
      data.append('category', this.form.productCategory)
      axios({
        method: 'post',
        url: 'http://localhost:3000/products',
        data: data,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          this.form.productName = ''
          this.form.productDesc = ''
          this.form.productPrice = ''
          this.form.productStock = ''
          this.file = ''
          this.form.productCategory = ''
          this.products = data
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err
          })
        })
    }
  }
}
</script>

<style scoped>
#mainAdmin {
    height: 69vh;
}
</style>
