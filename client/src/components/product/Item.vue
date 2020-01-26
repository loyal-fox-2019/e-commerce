<template>
  <sui-card>
    <sui-image :src="item.image" height="150" alt="Gambar tidak tersedia" />
    <sui-card-content>
      <sui-card-header>{{item.name}}</sui-card-header>
      <sui-card-meta>
        {{item.city}},
        <sui-icon name="weight" />
        {{item.weight}} kg
      </sui-card-meta>
      <sui-card-description style="overflow-y: auto;height: 50px;">{{item.description}}</sui-card-description>
    </sui-card-content>
    <sui-card-content extra>
      <sui-icon slot="left" name="user" />
      Tersedia: {{item.stock}}
      <span slot="right">Rp {{item.price}}/item</span>
    </sui-card-content>
    <div
      v-if="$route.path == '/'"
      class="fields"
      style="display: flex; flex-direction:column;align-items:center;padding:5px;"
    >
      <b>
        <h4>Add to Cart</h4>
      </b>
      <VueNumericInput
        v-model="value"
        :min="1"
        :max="item.stock"
        size="80px"
        align="center"
        style="margin: 5px auto"
      />
      <sui-button content="Confirm" @click.prevent="addToCart" /> <i class="shopping cart"></i>
    </div>
  </sui-card>
</template>

<script>
import VueNumericInput from "vue-numeric-input";

export default {
  name: "ItemCard",
  props: ["item"],
  components: {
    VueNumericInput
  },
  data() {
    return {
      value: 1
    };
  },
  methods: {
    addToCart() {
      // let product = this.item
      // product.qty = this.value
      // console.log(product);
      this.axios({
        url: "carts",
        method: "post",
        data: {
          product: this.item,
          qty: this.value
        }
      })
      .then(({data}) => {
        // sebentar ini mau di apain?
        this.$swal.fire('success added to cart')
        console.log(data);
      }).catch((err) => {
        console.log(err.response.data);
      });
    }
  }
};
</script>

<style>
</style>