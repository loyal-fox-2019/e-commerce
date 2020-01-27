<template>
    <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2 w-full mb-6 lg:mb-0 lg:w-1/2 px-4 flex flex-col">
  <div class="-mx-3 md:flex mb-6">
    <div class="md:w-full px-3">
      <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-password">
        Name
      </label>
      <input v-model="name" class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3" type="text" placeholder="product's name">
    </div>
  </div>
  <div class="-mx-3 md:flex mb-6">
    <div class="md:w-full px-3">
      <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-password">
        Description
      </label>
      <textarea v-model="description" class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3" type="text" placeholder="product's description"></textarea>
    </div>
  </div>
  <div class="-mx-3 md:flex mb-6">
    <div class="md:w-1/2 px-3 mb-6 md:mb-0">
      <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-first-name">
        Category
      </label>
      <input v-model="category" class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3" type="text" placeholder="product's category">
    </div>
    <div class="md:w-1/2 px-3">
      <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-last-name">
        Brand
      </label>
      <input v-model="brand" class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4" type="text" placeholder="product's brand">
    </div>
  </div>
  <div class="-mx-3 md:flex mb-6">
    <div class="md:w-1/3 px-3 mb-6 md:mb-0">
      <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-first-name">
        Price
      </label>
      <input v-model="price" class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3" type="number" placeholder="199000" min="1">
    </div>
    <div class="md:w-1/3 px-3">
      <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-last-name">
        Stock
      </label>
      <input v-model="stock" class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4" type="number" placeholder="120" min="1">
    </div>
    <div class="md:w-1/3 px-3">
      <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-last-name">
        Weight
      </label>
      <input v-model="weight" class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4" type="number" placeholder="200" min="1">
    </div>
  </div>
  <div class="-mx-3 md:flex mb-6">
    <div class="md:w-full px-3">
      <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-last-name">
        Image
      </label>
      <input class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4" type="file" name="image" ref="file" @change="onFileChanged">
      <img v-if="url" :src="url" />
    </div>
  </div>
  <button @click.prevent="submitProduct" class="px-1 py-1 text-white bg-red-500 hover:bg-red-600 border border-transparent rounded focus:outline-none focus:shadow-outline h-10 mt-2">Submit</button>
</div>
</template>

<script>
export default {
  name: "ProductForm",
  props: {
    product: Object
  },
  data() {
    return {
      name: '',
      price: '',
      stock: '',
      description: '',
      category: '',
      weight: '',
      brand: '',
      image: '',
      url: null,
      id: '',
      singleProduct: ''
    }
  },
  methods: {
    submitProduct() {
      if (this.id) {
        let formData = new FormData();
        formData.append("name", this.name)
        formData.append("price", this.price)
        formData.append("stock", this.stock)
        formData.append("description", this.description)
        formData.append("category", this.category)
        formData.append("weight", this.weight)
        formData.append("brand", this.brand)
        formData.append("image", this.image);
        this.$axios({
          method: 'PUT',
          url: `products/${this.id}`,
          headers: {
            access_token: localStorage.getItem('access_token')
          },
          data: formData
        })
          .then(({ data }) => {
            console.log(data)
            this.$swal.fire({
              title: 'Success!',
              text: 'Product successfully edited',
              icon: 'success',
              confirmButtonText: 'Close'
            })
            this.product = {}
            this.$emit('fetch-products')
          })
          .catch(err => {
            this.$swal.fire({
              title: 'Error!',
              text: err.response.data.error,
              icon: 'error',
              confirmButtonText: 'Close'
            })
          })
          .finally(() => {
            this.resetForm()
          })
      } else {
        let formData = new FormData();
        formData.append("name", this.name)
        formData.append("price", this.price)
        formData.append("stock", this.stock)
        formData.append("description", this.description)
        formData.append("category", this.category)
        formData.append("weight", this.weight)
        formData.append("brand", this.brand)
        formData.append("image", this.image);
        this.$axios({
          method: 'POST',
          url: 'products',
          headers: {
            access_token: localStorage.getItem('access_token')
          },
          data: formData
        })
          .then(({ data }) => {
            console.log(data)
            this.$swal.fire({
              title: 'Success!',
              text: 'Product successfully created',
              icon: 'success',
              confirmButtonText: 'Close'
            })
            this.product = {}
            this.$emit('fetch-products')
          })
          .catch(err => {
            this.$swal.fire({
              title: 'Error!',
              text: err.response.data.error,
              icon: 'error',
              confirmButtonText: 'Close'
            })
          })
          .finally(() => {
            this.resetForm()
          })
      }
      
    },
    resetForm() {
      this.name = ''
      this.price = ''
      this.stock = ''
      this.description = ''
      this.category = ''
      this.weight = ''
      this.brand = ''
      this.image = ''
      this.url = null
    },
    onFileChanged(event) {
      this.image = this.$refs.file.files[0];
      const file = event.target.files[0];
      this.url = URL.createObjectURL(file)
    },
  },
  mounted() {
    if (this.product) {
      this.name = this.product.name
      this.price = this.product.price
      this.stock = this.product.stock
      this.description = this.product.description
      this.category = this.product.category
      this.weight = this.product.weight
      this.brand = this.product.brand
      this.image = this.product.image
      this.id = this.product._id
      this.singleProduct = this.product
    }
  }
}
</script>

<style>

</style>