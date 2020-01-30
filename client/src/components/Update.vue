<template>
  <div class="card mb-3 mt-5 mx-auto" style="max-width: 1200px;">
    <div class="row no-gutters">
      <div class="col-md-4">
        <img :src="product.image" class="card-img" alt="ProductImage" />
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">Product Title:</h5>
          <b-form-input
            v-model="product.name"
            placeholder="Enter product title"
          ></b-form-input>
          <h5 class="card-title">Product Price:</h5>
          <b-form-input
            v-model="product.price"
            type="number"
            placeholder="Enter product title"
          ></b-form-input>
          <h5 class="card-title">Product Stock:</h5>
          <b-form-input
            v-model="product.stock"
            class="form-control"
            type="number"
            placeholder="Jumlah Produk (jangan pake koma dan titik)"
          ></b-form-input>
          <h5 class="card-title">Product Description:</h5>
          <b-form-textarea
            id="textarea"
            v-model="product.description"
            placeholder="Product description..."
            rows="3"
            max-rows="6"
          ></b-form-textarea>

          <button
            @click="updateProduct"
            type="button"
            class=" mx-5 btn btn-info"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import axios from 'axios'
export default {
  name: 'productShow',
  data() {
    return {}
  },
  computed: {
    product() {
      return this.$store.state.productShow
    }
  },
  methods: {
    ...mapActions(['addUserCart']),
    addUserCartAndRedirect() {
      this.addUserCart({
        payload: this.pesanan,
        productId: this.product._id
      })
      this.$router.push({
        path: '/usercart'
      })
    },
    updateProduct() {
      axios({
        method: 'patch',
        url: `http://localhost:3000/products/${this.product._id}`,
        data: {
          name: this.product.name,
          price: this.product.price,
          stock: this.product.stock,
          description: this.product.description
        },
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          // console.log('data hasbeen updated ', data)
          this.$store.dispatch('getAllItem')
          this.$router.push({
            path: '/'
          })
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style scoped>
.borderBottomNya {
  border-bottom: 1px solid #eeeedd;
  padding-bottom: 1.2vh;
}

.hargaNya {
  padding-top: 1vh;
  padding-bottom: 1vh;
}
</style>
