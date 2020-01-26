<template>
  <div class="row d-flex">
    <div class="card mb-2 col-md-2 col-lg-2 col-sm-12" style="width: 18rem;" v-for="product in allProducts" :key="product._id">
      <img :src="product.image" class="card-img-top" alt="img" height="200" width="500" />
      <div class="card-body">
        <h4 class="card-title">{{product.name}}</h4>
        <h5>{{product.price}}</h5>
        <h6 class="card-text">Stocks: <span>{{product.stocks}}</span></h6>
        <p class="card-text">
          Marching Store Indonesia
        </p>
        <router-link to="/detail"
          ><a href="#" class="btn btn-warning mr-2 mb-1 mt-1"
            >View Details</a
          ></router-link
        >
        <router-link to="/detail"
          ><a href="#" class="btn btn-primary mr-2">Add to Cart</a></router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardItem',
  computed: {
    allProducts() {
      return this.$store.state.allItem
    }
  }
}
</script>

<style lang="css" scoped></style>
