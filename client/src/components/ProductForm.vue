<template>
  <div class="col-md-10 offset-md-1">
    <b-form>
      <b-form-group label="Product Name" label-for="name">
        <b-form-input
          id="name"
          type="text"
          required
          placeholder="Enter product name"
          v-model='name'
        ></b-form-input>
      </b-form-group>
      <b-form-group label="Product Image" label-for="image">
        <img v-if='edit && !image' :src="productDetail.image">
        <img v-if='image' :src="imageUrl">
        <b-form-file
          id="image"
          plain
          v-model='image'
        ></b-form-file>
      </b-form-group>
      <b-form-group label="Price" label-for="price">
        <b-form-input
          id="price"
          type="number"
          required
          placeholder="Enter product price"
          v-model='price'
          min=1000
          step=1000
        ></b-form-input>
      </b-form-group>
      <b-form-group label="Stock" label-for="stock">
        <b-form-input
          id="stock"
          type="number"
          required
          placeholder="Enter product stock"
          v-model='stock'
          min=1
        >Test</b-form-input>
      </b-form-group>

      <b-button @click.prevent='postProduct' v-if='!edit' type="submit" variant="primary">
        Submit
      </b-button>
      <b-button @click.prevent='editProduct' v-if='edit' type="submit" variant="primary">
        Edit
      </b-button>
      <b-spinner v-if='isLoading' class='ml-3'></b-spinner>
    </b-form>
  </div>
</template>

<script>
export default {

  name: 'ProductForm',

  data () {
    return {
      name: '',
      image: null,
      imageUrl: '',
      price: 1000,
      stock: 1,
      isLoading: false,
      edit: false
    }
  },
  props: ['productDetail'],
  watch: {
    productDetail(){
      if (this.productDetail.name){
        this.edit = true
        this.name = this.productDetail.name
        this.price = this.productDetail.price
        this.stock = this.productDetail.stock
      }
    },
    image(){
      this.imageUrl = URL.createObjectURL(this.image)
    }
  },
  methods: {
    postProduct(){
      this.isLoading = true
      let form = new FormData()
      form.append('name', this.name)
      form.append('image', this.image)
      form.append('price', this.price)
      form.append('stock', this.stock)
      this.$axios({
        method: 'POST',
        url: `/products`,
        data: form,
        headers: {
          token: localStorage.getItem('access_token')
        }
      })
        .then(() => {
          this.$swal.fire({
            icon: 'success',
            html: 'Your product is successfully posted'
          })
          this.$router.push('/items')
        })
        .catch((err) => {
          let errorMessage = err.response.data.message
          this.$swal.fire({
            icon: 'error',
            title: 'Invalid Input',
            html: errorMessage
          })
        })
        .finally(() => {
          this.isLoading = false
        })
    },
    editProduct(){
      this.isLoading = true
      let form = new FormData()
      form.append('name', this.name)
      form.append('image', this.image)
      form.append('price', this.price)
      form.append('stock', this.stock)
      this.$axios({
        method: 'PATCH',
        url: `/products/${this.productDetail._id}`,
        data: form,
        headers: {
          token: localStorage.getItem('access_token')
        }
      })
        .then(() => {
          this.$swal.fire({
            icon: 'success',
            html: 'Your product is successfully edited'
          })
          this.$router.push('/items')
        })
        .catch((err) => {
          let errorMessage = err.response.data.message
          this.$swal.fire({
            icon: 'error',
            title: 'Invalid Input',
            html: errorMessage
          })
        })
        .finally(() => {
          this.isLoading = false
        })
    }
  }
}
</script>

<style lang="css" scoped>
img{
  max-height: 150px;
}
</style>