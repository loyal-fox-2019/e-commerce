<template>
  <section id="main">
    <div id="list" class="justify-content-center">
      <div></div>
      <card
      v-for="product in $store.state.products"
      :key="product._id"
      :product="product"
      />
    </div>
    <div id="detail">
      <h3>Skins Detail HELLO</h3>
    </div>
  </section>
</template>

<script>
import card from '../components/productCard.vue';

export default {
  components: { card },
  data() {
    return {
      message: 'Hello world',
    };
  },
};
</script>

<style scoped>
card {
  left: 20%;
}
#main {
  display: flex;
  justify-content: space-between;
}
#list {
  display: grid;
  justify-content: center;
  padding: 1em;
  margin-right: 10%;
  margin-top: 6px;
  width: 30vw;
  height: 90vh;
  margin-left: 1em;
  border: 2px solid white;
  overflow-y: scroll;
}
#detail {
  margin-right: 1em;
  display: inline-block;
}
</style>
