<template>
  <div>
    <b-card class="card">
      <b-card-text>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Product</th>
              <th scope="col"></th>
              <th scope="col">Price</th>
              <th scope="col">Add Item</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in data" :key="item.id">
              <th class="text-center">
                <img :src="item.image" alt="loading ..." class="image-item">
              </th>
              <td class="title">{{ item.name }} -
                <br> {{ item.weight }} gr
                <div class="mt-3">
                  <a href="#" @click.prevent="showModal(item)" class="card-link">View Details</a>
                </div>
              </td>
              <td>Rp. {{item.price.toLocaleString("id")}}</td>
              <td><b-button variant="success" @click.prevent="addCart(item)">
                <i class="fas fa-cart-plus"></i></b-button></td>
            </tr>
            <Modal :data="item" />
          </tbody>
        </table>
      </b-card-text>
    </b-card>
  </div>
</template>

<script>
import Modal from './ModalDetail.vue';

export default {
  components: {
    Modal,
  },
  name: 'GoldPurchase',
  data() {
    return {
      cart: this.cartItem,
      item: null,
    };
  },
  methods: {
    // addItem(id) {

    // }
    addCart(data) {
      this.$store.dispatch('addItem', data._id)
      this.$store.dispatch('fetchCart');
      this.$store.state.newcart;
    },
    showModal(data) {
      this.item = data;
      this.$bvModal.show('modal-lg');
    },
  },
  computed: {
    data() {
      let data;
      if (this.$route.path == '/purchase') {
        data = this.$store.state.barsGold;
      } else {
        data = this.$store.state.seriesGold;
      }
      return data;
    },
    cartItem() {
      return this.$store.state.cart;
    },
  },
  created() {
    if (this.$route.path == '/purchase') {
      this.$store.dispatch('fetchBarsGold');
    } else {
      this.$store.dispatch('fetchSeriesGold');
    }
    // this.$store.dispatch('fetchCart');
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Hind+Siliguri&display=swap');

.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.1);
  border-radius: 8px !important;
  border: none;
  text-align: left;
  font-family: 'Hind Siliguri', sans-serif;
}

.image-item {
  width: 120px
}

.form-control {
  width: 75px;
}

.form-control:hover, .form-control:focus {
  border-color: #cb9b2d !important;
  box-shadow: none !important
}

.card-link {
  color: #cb9b2d !important;
  font-weight: bold;
  font-size: 12px;
}
.card-link:hover {
  color: #23427e !important;
  font-weight: bold
}

img:hover {
  transform:scale(1.05);
  transition-duration: 0.2s;
}

.title {
  font-size: 1.2rem;
  font-weight: bold;
}
</style>
