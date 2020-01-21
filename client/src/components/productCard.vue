  <template>
  <div>
    <b-card
      :title="product.name"
      :img-src="product.image"
      img-alt="Image"
      img-top
      tag="article"
      style="max-width: 15rem;"
      class="mb-2 text-center"
    >
      <div class="text-center">
        <b-button href="#" variant="primary">Detail</b-button>
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
};
</script>

<style scoped>
</style>
