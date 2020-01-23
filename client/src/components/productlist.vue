<template>
  <div>
    <!-- <pre>{{ data }}</pre> -->
    <div class="card" style="width: 18rem;">
      <img class="card-img-top" :src="data.picture" alt="Card image cap">
      <div class="card-body">
        <h5 class="card-title">{{ data.name }}</h5>
        <h6>Rp {{ data.price }}</h6>
        <h6>Available Stock: {{ data.stock }}</h6>
        <h6>Seller: {{ data.seller }}</h6>
        <p class="card-text">{{ data.description }}</p>
        <router-link :to="`/product/${data._id}`">product details</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'productlist',
  props: ['data'],
  methods:{
    // descriptionHelper(str){

    // }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
