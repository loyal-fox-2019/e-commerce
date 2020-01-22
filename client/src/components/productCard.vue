<template>
  <div id="main">
    <b-card
      border-variant="dark"
      :title="product.name"
      :img-src="product.image"
      img-alt="Image"
      img-top
      tag="article"
      style="max-width: 15rem;"
      class="mb-2 text-center"
    >
      <div class="text-center">
        <b-button :to="`/shopping/${product._id}`"
          style="background-color: black;"
          @click="setCurrent(product)"
          variant="primary"
      >Detail</b-button>
      </div>
    </b-card>
  </div>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
    },
  },
  name: 'product',
  data() {
    return {
      message: 'Hello world',
    };
  },
  methods: {
    setCurrent(payload) {
      this.$emit('showmodal');
      this.$store.dispatch('setCurrentProject', payload);
    },
  },
};
</script>

<style scoped>
</style>
