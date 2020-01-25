<template>
  <div class="mine">
    <div class="container d-block mx-auto">
      <div v-if="productCart[0]">
        <div class="product row">
          <productInCart v-for="(product, i) in productCart" :item="product" :key="i"></productInCart>
        </div>
        <div class="container d-block mx-auto">
          <div class="d-flex">
            <div class="col-6">
              <h1>Subtotal: {{convertRupiah}}</h1>
            </div>
            <div class="col-6" v-on:click="checkOut">
              <div class="btn p-3 btn-primary">Checkout</div>
            </div>
          </div>
        </div>
      </div>
      <div v-else-if="!productCart[0]">
        <div class="container d-block mx-auto center" id="notFound">
          <h1>Your Cart is Empty...</h1>
          <div class="btn btn-primary">
            <router-link to="/" class="text-white">Go Back Home</router-link>
          </div>
        </div>
      </div>
    </div>
    <router-link :to="{name: 'history'}">See history</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
import productInCart from "@/components/productInCart.vue";
import axios from "axios";
import Swal from "sweetalert2";
export default {
  name: "myCart",
  components: {
    productInCart
  },
  data() {
    return {
      baseUrl: "http://localhost:3000",
      productCart: null,
      subTotal: null
    };
  },
  created() {
    this.subTotal = null;
    let url = this.baseUrl;
    this.productCart = null;
    axios({
      method: "GET",
      url: `${url}/product/cart/myCart`,
      headers: {
        token: localStorage.getItem("token")
      }
    }).then(({ data }) => {
      let belomCekOut = [];
      for (let one of data) {
        if (!one.checkOut) {
          belomCekOut.push(one);
          let harga = one.productId.price * one.qty;
          this.subTotal += harga;
        }
      }
      this.productCart = belomCekOut;
    });
  },
  computed: {
    convertRupiah() {
      let angka = this.subTotal;
      var rupiah = "";
      if (angka) {
        var angkarev = angka
          .toString()
          .split("")
          .reverse()
          .join("");
        for (var i = 0; i < angkarev.length; i++)
          if (i % 3 == 0) rupiah += angkarev.substr(i, 3) + ".";
        return (
          "Rp. " +
          rupiah
            .split("", rupiah.length - 1)
            .reverse()
            .join("") +
          ",00"
        );
      } else {
        return "0";
      }
    }
  },
  methods: {
    checkOut() {
      let url = this.baseUrl;
      let total = this.subTotal;
      axios({
        method: "patch",
        url: `${url}/product/cart/myCart/checkOut`,
        headers: {
          token: localStorage.getItem("token")
        },
        data: {
          total
        }
      })
        .then(() => {
          Swal.fire("Yay!", "Checkout Success!", "success");
          this.$router.push("/");
        })
        .catch(err => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: err
          });
        });
    }
  }
};
</script>

<style scoped>
#notFound {
  background: url("../assets/page-not-found-2.png");
}
</style>