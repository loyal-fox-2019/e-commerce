<template>
  <section class="justify-content-center" fixed>
    <Loading
      :active.sync="isLoading"
      :is-full-page="fullPage"
      :loader="'bars'"
    ></Loading>
    <b-card
      style="text-align: center;"
      v-if="!isLoading"
      :title="$store.state.currentProduct.name"
      :sub-title="getPrice">
      <b-card-text>
        <b-img
          id="image"
          class="justify-content-center"
          thumbnail fluid
          v-bind="mainProps"
          :src="$store.state.currentProduct.image" alt="Image 1"
        ></b-img>
        <b-col>
        </b-col>
        <div class="text-center">
          <b-button disabled variant="outline-primary">
            Stock <b-badge variant="light">{{ $store.state.currentProduct.stock }}</b-badge>
          </b-button>
        </div>
        <div class="text-center mt-1">
          <b-button v-show="quantity === 1"
            disabled class="mr-1"
            @click="removeQuantity" variant="outline-primary">-</b-button>
          <b-button v-show="quantity !== 1"
            class="mr-1" @click="removeQuantity" variant="outline-primary">
          -</b-button>
          <b-button disabled variant="outline-primary">
            Quantity <b-badge variant="light">{{ quantity }}</b-badge>
          </b-button>
          <b-button v-show="quantity < $store.state.currentProduct.stock"
            @click="addQuantity" class="ml-1"
            variant="outline-primary"
          >+</b-button>
          <b-button v-show="quantity === $store.state.currentProduct.stock"
            @click="addQuantity" class="ml-1"
            disabled
            variant="outline-primary"
          >+</b-button>
        </div>
        <div class="text-center mt-1">
          <b-button @click="addToCart" variant="outline-primary">Add to cart</b-button>
        </div>
      </b-card-text>
    </b-card>
  </section>
</template>

<script>
import Loading from 'vue-loading-overlay';
import 'sweetalert2/dist/sweetalert2.min.css';

export default {
  components: { Loading },
  data() {
    return {
      isLoading: false,
      fullPage: true,
      mainProps: {
        width: 400,
        height: 400,
      },
      quantity: 1,
      type: 'number',
    };
  },
  methods: {
    addQuantity() {
      this.quantity += 1;
    },
    removeQuantity() {
      this.quantity -= 1;
    },
    addToCart() {
      if (!this.$store.state.isLogin) {
        this.$swal('Opps... You have to login!');
      } else {
        const { _id, name, price } = this.$store.state.currentProduct;
        const totalPrice = this.quantity * this.$store.state.currentProduct.price;
        const payload = {
          productId: _id,
          productName: name,
          qty: this.quantity,
          productPrice: totalPrice,
          price,
        };
        this.$store.dispatch('add', payload);
        this.quantity = 1;
      }
    },
  },
  computed: {
    getPrice() {
      const { price } = this.$store.state.currentProduct;
      const priceToString = price.toString();
      let priceToShow = '';
      let counter = 0;
      for (let i = priceToString.length - 1; i >= 0; i -= 1) {
        if (counter === 2 && i !== 0) {
          priceToShow = `,${priceToString[i]}${priceToShow}`;
          counter = 0;
        } else {
          priceToShow = `${priceToString[i]}${priceToShow}`;
          counter += 1;
        }
      }
      return `Rp ${priceToShow}`;
    },
  },
};
</script>

<style scoped>
#image {
  margin-top: 1em;
  margin-bottom: 1em;
}
</style>
