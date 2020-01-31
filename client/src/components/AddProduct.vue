<template>
  <div>
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
  </div>
</template>

<script>
export default {
  name: 'AddProduct',
  data () {
    return {
      file: null,
      form: {
        productName: '',
        productDesc: '',
        productPrice: '',
        productStock: '',
        productCategory: ''
      },
      categories: []
    }
  },
  methods: {
    onFileChange () {
      this.file = event.target.files[0]
    },
    createProduct () {
      this.$store.dispatch('createProduct', { productName: this.form.productName, file: this.file, productDesc: this.form.productDesc, productPrice: this.form.productPrice, productStock: this.form.productStock, productCategory: this.form.productCategory })
    }
  },
  created () {
    this.$store.state.categories.forEach(element => {
      this.categories.push(element.name)
    })
    this.form.productName = ''
    this.form.productDesc = ''
    this.form.productPrice = ''
    this.form.productStock = ''
    this.form.productCategory = ''
  }
}
</script>

<style scoped>

</style>
