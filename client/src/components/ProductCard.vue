<template>
  <div
    class="item col-sm-12 col-md-6 col-lg-3 col-xl-2 mt-3 mr-sm-auto mr-md-auto mx-lg-0 mx-xl-0"
  >
    <div class="card">
      <img
        class="card-img-top tambahan"
        :src="product.image"
        alt="Card image cap"
      />
      <div class="card-body">
        <h5 class="card-title">{{ product.name }}</h5>
        <h5>Rp. {{ product.price }}</h5>
      </div>
      <div class="card-footer">
        <small class="text-muted">Last updated 3 mins ago</small>
      </div>
      <button
        @click.prevent="showProductCard"
        type="button"
        class="btn btn-info"
      >
        Show Details
      </button>
      <button
        v-if="addItem"
        @click.prevent="updateCard"
        type="button"
        class="btn btn-success"
      >
        Edit
      </button>
      <button
        @click.prevent="deleteCard"
        v-if="addItem"
        type="button"
        class="btn btn-danger"
      >
        Delete
      </button>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import axios from 'axios'
export default {
  name: 'ProductCard',
  data() {
    return {
      addItem: false
    }
  },
  methods: {
    ...mapMutations(['SET_PRODUCTSHOW']),
    showProductCard() {
      this.SET_PRODUCTSHOW(this.product)
      this.$router.push('/productshow')
      window.scrollTo(0, 0)
    },
    updateCard() {
      this.SET_PRODUCTSHOW(this.product)
      this.$router.push('/productupdate')
      window.scrollTo(0, 0)
    },
    deleteCard() {
      axios({
        method: 'delete',
        url: `http://localhost:3000/products/${this.product._id}`,
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
  },
  props: ['product'],
  computed: {
    user() {
      return this.$store.state.user
    }
  },
  watch: {
    user: function(newValue, oldValue) {
      if (newValue.role === 'admin') {
        this.addItem = true
      } else {
        this.addItem = false
      }
    }
  }
}
</script>

<style scoped>
.tambahan {
  height: 23.5vh;
}
</style>
