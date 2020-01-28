<template>
  <div class="col-sm-3 m-0 p-0 h-100" v-if='productData.stock > 0'>
    <b-card
      :title="productData.name"
      :img-src="productData.image"
      img-top
    >
      <b-card-text>
        Rp. {{productData.price | separator}}
      </b-card-text>
      <b-card-text v-if='!cart'>
        {{productData.stock}} left
      </b-card-text>
      <b-card-text v-else>
        {{productData.stock}} in cart
      </b-card-text>
      <b-card-text v-if='!owner'>
        Sold by {{productData.userId.username}}
      </b-card-text>
      <div v-if='owner'>
        <b-button class='m-2' @click='edit(productData._id)' variant="primary">Edit</b-button>
        <b-button class='m-2' @click='remove(productData._id)' variant="danger">Delete</b-button>
      </div>
      <div v-if='!owner && !cart'>
        <b-form @submit.prevent='addToCart(productData._id)'>
          <b-form-input class='col-sm-4 ml-auto mr-auto' type='number' min='1' :max='productData.stock' v-model='quantity'></b-form-input>
          <b-button type='submit' variant="success">
            Add to Cart
          </b-button>
        </b-form>
      </div>
      <div v-if='cart'>
        <!-- <b-form @submit.prevent='removeFromCart(productData._id)'> -->
          <!-- <b-form-input class='col-sm-4 ml-auto mr-auto' type='number' min='1' :max='productData.stock' v-model='quantity'></b-form-input> -->
          <b-button class='btn btn-danger' @click='removeFromCart(productData._id)'>
            Remove from Cart
          </b-button>
        <!-- </b-form> -->
      </div>
    </b-card>
  </div>
</template>

<script>
export default {

  name: 'ProductCard',

  data () {
    return {
      quantity: 1
    }
  },
  props: ['productData', 'owner', 'cart'],
  watch: {
    isLogin(){
      return this.$store.state.isLogin
    }
  },
  methods: {
    edit(productId){
      this.$router.push(`/edit/${productId}`)
    },
    remove(productId){
      this.$swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      })
        .then((result) => {
          if (result.value) {
            this.$axios({
              method: 'DELETE',
              url: `/products/${productId}`,
              headers: {
                token: localStorage.getItem('access_token')
              }
            })
              .then(() => {
                this.$emit('refresh')
                this.$swal.fire(
                  'Deleted!',
                  'Your item has been deleted.',
                  'success'
                )
              })
              .catch((err) => {
                this.$swal.fire({
                  icon: 'error',
                  html: err.response.data.message
                })
              })
          }
        })
    },
    addToCart(productId){
       this.$axios({
          method: 'POST',
          url: `/users/cart`,
          headers: {
            token: localStorage.getItem('access_token')
          },
          data: {
            productId,
            quantity: this.quantity
          }
        })
          .then(({data}) => {
            this.$swal.fire({
              icon: 'success',
              html: `You have ${data.total} in your cart`
            })
          })
          .catch((err) => {
            this.$swal.fire({
              icon: 'error',
              html: err.response.data.message
            })
          })
    },
    removeFromCart(productId){
      this.$swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      })
        .then((result) => {
          if (result.value) {
            this.$axios({
              method: 'DELETE',
              url: `/users/cart`,
              headers: {
                token: localStorage.getItem('access_token')
              },
              data: {
                productId
              }
            })
              .then(() => {
                this.$store.dispatch('getUserCart')
              })
              .catch((err) => {
                this.$swal.fire({
                  icon: 'error',
                  html: err.response.data.message
                })
              })
          }
        })
    }
  },
  filters: {
    separator(number){
      let result = ''
      String(number).split('').reverse().forEach((e, i) => {
        if (i % 3 == 0 && i != 0){
          result += '.'
        }
        result += e
      })
      return result.split('').reverse().join('')
    }
  }
}
</script>

<style scoped>
.card-img-top{
  min-height: 200px;
  max-height: 200px;
  object-fit: contain;
}
.card-text{
  margin: 5px;
  padding: 0;
}
.card{
  max-height: 450px;
}
.card-body{
  padding: 10px;
}
</style>