<template>
  <div>
    <b-card
      :title="product.name"
      :img-src="product.image"
      img-alt="Image"
      img-top
      tag="article"
      style="max-width: 20rem;"
      class="mb-2"
    >
      <b-card-text>
        Some quick
        example text to build on the card
        title and make up the bulk of the card's content.
      </b-card-text>

      <b-button href="#" variant="primary">Go somewhere</b-button>
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
};
</script>

<style scoped>
</style>
