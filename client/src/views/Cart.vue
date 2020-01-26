<template>
  <div class="container cart">
    <b-row>
      <b-col class="mt-2" cols="8">
        <b-list-group>
          <b-list-group-item
            v-for="item in itemsInCart"
            :key="item.product._id"
            class="d-flex justify-content-between align-items-center"
          >
            <b-card
              :img-src="item.product.image"
              img-alt="Card image"
              img-left
              class="mb-3"
              img-height="200px"
            >
              <b-card-text>
                {{ item.product.title }}
                <br />
                <b>Harga</b>: {{ fixPriceDisplay(item.product.price) }}
              </b-card-text>
              <b-button-group class="mx-1">
                <b-button @click="substractItem(item)" variant="primary"
                  ><b-icon-dash></b-icon-dash
                ></b-button>
                <b-button variant="primary" disabled>{{ item.total }}</b-button>
                <b-button @click="addItem(item)" variant="primary"
                  ><b-icon-plus></b-icon-plus
                ></b-button>
              </b-button-group>
            </b-card>
          </b-list-group-item>
        </b-list-group>
      </b-col>
      <b-col class="mt-2">
        <b-list-group>
          <b-list-group-item variant="info"
            >Ringkasan Belanja</b-list-group-item
          >
          <b-list-group-item>
            <b>Total Harga</b>: {{ fixPriceDisplay(totalPrice) }}
          </b-list-group-item>
        </b-list-group>
        <!-- <h3>Ringkasan Belanja</h3> -->
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import formatPrice from '../helpers/formatPrice';

export default {
  computed: {
    totalPrice() {
      return this.itemsInCart.reduce((prev, curr) => {
        return prev + curr.product.price * curr.total;
      }, 0);
    },
    ...mapState(['itemsInCart'])
  },
  methods: {
    fixPriceDisplay(price) {
      return formatPrice(price);
    },
    addItem(currItem) {
      if (currItem.total < currItem.product.stock) {
        const tempList = this.$store.getters.getItemsInCart;
        const updatedList = tempList.map(item => {
          const { product } = item;
          let { total } = item;

          if (product._id === currItem.product._id) {
            total += 1;
          }

          return { product, total };
        });
        this.$store.commit('updateItemInCart', updatedList);
      }
    },
    substractItem(currItem) {
      if (currItem.total > 1) {
        const tempList = this.$store.getters.getItemsInCart;
        const updatedList = tempList.map(item => {
          const { product } = item;
          let { total } = item;

          if (product._id === currItem.product._id) {
            total -= 1;
          }

          return { product, total };
        });
        this.$store.commit('updateItemInCart', updatedList);
      }
    }
  }
};
</script>

<style>
</style>