<template>
    <div>
  <b-card
    :title="productDetails.productName"
    :img-src="productDetails.productImage"
    img-alt="Image"
    img-top
    tag="article"
    style="max-width: 20rem;"
    class="mb-2"
    bg-variant="secondary"
  >
    <b-card-text>
      Category: {{productDetails.category}}
      <br>
      Price: {{productDetails.price}}
      <br>
      Stock: {{productDetails.stock}}
    </b-card-text>

    <b-button variant="success" @click="editDetails" class="mx-3">Edit</b-button>
    <b-button href="#" variant="danger" @click="deleteProduct(productDetails._id)" class="mx-3">Delete</b-button>
    <b-modal  :id="'modal-'+productDetails._id" title="Edit Product" hide-footer>
          <b-form @submit.prevent="editProduct(productDetails._id)">
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
          :value="productDetails.category"
          required
        ></b-form-select>
      </b-form-group>
      <b-button block variant="warning" type="submit" @click="$bvModal.hide('editProductModal')">Edit Product</b-button>
        </b-form>
        </b-modal>
  </b-card>
</div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'
export default {
  name: 'AdminProductCards',
  props: {
    productDetails: {
      type: Object
    }
  },
  data () {
    return {
      file: this.productDetails.productImage,
      form: {
        productName: this.productDetails.productName,
        productDesc: this.productDetails.description,
        productPrice: this.productDetails.price,
        productStock: this.productDetails.stock,
        productCategory: this.productDetails.category
      },
      categories: ['Playstation', 'Xbox', 'Switch', 'Steam', 'Accessories', 'Custom', 'Collectibles']
    }
  },
  methods: {
    onFileChange () {
      this.file = event.target.files[0]
    },
    editDetails () {
      this.productName = this.productDetails.productName
      this.productDesc = this.productDetails.description
      this.productPrice = this.productDetails.price
      this.productStock = this.productDetails.stock
      this.productCategory = this.productDetails.category
      this.file = this.productDetails.productImage
      this.$bvModal.show(`modal-${this.productDetails._id}`)
    },
    editProduct (id) {
      // console.log(this.form.productName)
      let data = new FormData()
      data.append('productName', this.form.productName)
      data.append('productImage', this.file)
      data.append('description', this.form.productDesc)
      data.append('price', this.form.productPrice)
      data.append('stock', this.form.productStock)
      data.append('category', this.form.productCategory)
      // console.log(data)
      axios({
        method: 'put',
        url: 'http://localhost:3000/products/' + id,
        data: data,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          this.$emit('productUpdate', data)
          this.$bvModal.hide(`modal-${id}`)
        })
        .catch(err => {
          console.log(err)
        })
    },
    deleteProduct (id) {
      Swal.fire({
        title: 'Are you sure you want to delete this product?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, I want to delete this product'
      })
        .then((result) => {
          if (result.value) {
            return axios({
              method: 'delete',
              url: 'http://localhost:3000/products/' + id,
              headers: {
                token: localStorage.getItem('token')
              }
            })
          }
        })
        .then(({ data }) => {
          Swal.fire(
            'Deleted!',
            'Your product has been deleted.',
            'success'
          )
          this.$emit('productUpdate', data)
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
