<template>
  <div>
      <b-row align-h="center">
          <b-col cols="4"><img :src="$store.state.chosenDetail.productImage" class="detailedImg"></b-col>
          <b-col cols="4" align-h="center">
              <b-row style="float:right;"><h3 @click="goBack" style="cursor:pointer;"><i class="far fa-times-circle"></i></h3></b-row>
              <b-row class="mb-3">{{$store.state.chosenDetail.productName}}</b-row>
              <b-row class="my-3">Price: {{$store.state.chosenDetail.price}}</b-row>
              <b-row class="my-3">Stock: {{$store.state.chosenDetail.stock}}</b-row>
              <b-row class="my-3">Description:</b-row>
              <b-row class="my-3" style="text-align:justify;">{{$store.state.chosenDetail.description}}</b-row>
              <b-row align-v="center" class="detailValue">
                    <p style="float:left;margin-right:3%;">Quantity :</p>
                    <b-button pill variant="outline-warning" @click="minAmount"><i class="fas fa-minus"></i></b-button>
                    <p class="mx-2" style="margin-bottom:0px;">{{qty}}</p>
                    <b-button pill variant="outline-warning" @click="maxAmount"><i class="fas fa-plus"></i></b-button>
                 </b-row>
              <b-row class="my-3" v-if="$store.state.isAdmin"><EditProduct :editData="$store.state.chosenDetail"></EditProduct> <b-button @click="deleteProduct"><i class="fas fa-trash-alt"></i></b-button></b-row>
              <b-row class="my-3"><b-button @click="addCart">add to cart</b-button></b-row>
          </b-col>
      </b-row>
  </div>
</template>

<script>
import EditProduct from '../components/EditProduct'

export default {
  name: 'ProductDetails',
  components: {
    EditProduct
  },
  data () {
    return {
      amount: 1
    }
  },
  computed: {
    qty () {
      return this.amount
    }
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    minAmount () {
      if (this.amount <= 1) {
        this.amount = 1
      } else {
        this.amount -= 1
      }
    },
    maxAmount () {
      if (this.amount >= this.$store.state.chosenDetail.stock) {
        this.amount = this.$store.state.chosenDetail.stock
      } else {
        this.amount += 1
      }
    },
    addCart () {
      this.$store.dispatch('addCart', { productId: this.$store.state.chosenDetail._id, qty: this.amount })
    },
    deleteProduct () {
      this.$store.dispatch('deleteProduct', this.$store.state.chosenDetail._id)
    }
  }
}
</script>

<style scoped>
.detailedImg {
    height: 45vh;
}
</style>
