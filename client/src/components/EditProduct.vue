<template>
  <div>
      <b-button @click="$bvModal.show('edit-'+editData._id)" id="newProductButton" class="mr-3"><i class="fas fa-edit"></i></b-button>
        <b-modal  :id="'edit-'+editData._id" title="Add Product" hide-footer>
          <b-form @submit.prevent="editProduct">
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
          :value="editData.category.toLowerCase()"
          :options="categories"
          required
        ></b-form-select>
      </b-form-group>
      <b-button block variant="warning" type="submit" @click="$bvModal.hide('edit-'+editData._id)">Edit Product</b-button>
        </b-form>
        </b-modal>
  </div>
</template>

<script>
export default {
  name: 'EditProduct',
  data () {
    return {
      file: this.editData.productImage,
      form: {
        productName: this.editData.productName,
        productDesc: this.editData.description,
        productPrice: this.editData.price,
        productStock: this.editData.stock,
        productCategory: this.editData.category
      },
      categories: []
    }
  },
  props: {
    editData: {
      type: Object
    }
  },
  methods: {
    onFileChange () {
      this.file = event.target.files[0]
    },
    editProduct () {
      this.$store.dispatch('editProduct', { id: this.editData._id, productName: this.form.productName, file: this.file, productDesc: this.form.productDesc, productPrice: this.form.productPrice, productStock: this.form.productStock, productCategory: this.form.productCategory })
    }
  },
  created () {
    this.$store.state.categories.forEach(element => {
      this.categories.push(element.name)
    })
  }
}
</script>

<style scoped>

</style>
