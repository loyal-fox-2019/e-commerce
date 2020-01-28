<template>
  <!-- <h1>hai dari detail product</h1> -->
  <div class="d-flex mt-5 mr-5">
    <div class="col-5 left justify-content-start">
      <div class="col">
        <img :src="productDet.file" alt />
      </div>
    </div>
    <div class="col-7 kanan justify-content-start">
      <div class="d-flex flex-column">
        <h1>{{bagusinNama}}</h1>
        <h5>{{convertRupiah}}</h5>
      </div>
      <div class="d-flex flex-column">
        <p>{{productDet.description}} wahh sangat mengasyikkan!</p>
        <div class="buy" v-if="(!statusMilikku)">
          <h6>Buy:</h6>
          <b-form-input
            type="number"
            min="0"
            :max="productDet.stock"
            style="width: 200px"
            v-model="jml"
          ></b-form-input>
          <h6 class="mt-4">Total: {{estimatePrice}}</h6>
          <div class="d-flex justify-content-end">
            <div class="btn btn-primary" v-on:click="addToCart">Add to Cart</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import axios from "axios";
export default {
  name: "detailProduct",
  data() {
    return {
      id: this.$route.params.id,
      productDet: null,
      jml: null,
      statusMilikku: false,
      // baseUrl: "http://localhost:3000",
      baseUrl: "http://e-commerce-server.amadyanissa.my.id:3000",
      price: null
    };
  },
  created() {
    // console.log(this.id);
    let id = this.id;
    let url = this.baseUrl;
    axios({
      method: "GET",
      url: `${url}/product/id/${id}`
    }).then(({ data }) => {
      this.productDet = data;
      this.price = data.price;

      if (data.ownerId == localStorage.getItem("userId")) {
        this.statusMilikku = true;
      }
    });
  },
  methods: {
    addToCart() {
      let id = this.id;
      let url = this.baseUrl;
      let totalPrice = this.price * this.jml;
      // console.log(totalPrice);
      let qty = this.jml;
      axios({
        method: "POST",
        url: `${url}/product/addToCart/${id}`,
        headers: {
          token: localStorage.getItem("token")
        },
        data: {
          qty,
          totalPrice
        }
      })
        .then(() => {
          this.$router.push("/myCarts");
        })
        .catch(err => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: err
          });
        });
    }
  },
  computed: {
    bagusinNama() {
      let nama = this.productDet.name;
      let jadinya = nama.charAt(0).toUpperCase() + nama.slice(1);
      return jadinya;
    },
    convertRupiah() {
      let angka = this.productDet.price;
      var rupiah = "";
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
    },
    estimatePrice() {
      let price = this.productDet.price;
      let qty = this.jml;
      let est = price * qty;
      let angka = est;
      var rupiah = "";
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
    }
  }
};
</script>

<style scoped>
.left {
  max-width: 50vw;
  /* background-color: cadetblue; */
}

.kanan {
  width: 100%;
  text-align: start;
}
img {
  max-width: 500px;
  max-height: 500px;
}
</style>