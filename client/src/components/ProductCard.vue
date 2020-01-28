<template>
  <b-card tag="article" style="max-width: 152px;" class="my-3 shadow-sm">
    <b-card-img
      :src="productData.images[0]"
      alt="Image"
      img-top
      style="object-fit: fill;"
    ></b-card-img>
    <hr />
    <b-card-text class="font-weight-light px-2 m-0">
      <div
        class="d-inline-block text-truncate text-capitalize"
        style="max-width: 140px;font-size:13px;"
      >
        <a
          href="#"
          class="stretched-link text-decoration-none text-dark font-weight-bold"
          @click.prevent="showProductDetail"
        >
          {{ productData.name }}
        </a>
      </div>
      <div class="font-weight-light text-wrap" style="font-size:11px;">
        Stok barang:
        <span class="font-weight-bold">{{ productData.stock }}</span>
      </div>
      <span
        class="font-weight-bold text-danger text-wrap"
        style="font-size:11px;"
      >
        Rp.
        {{ productData.price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,") }}
      </span>
    </b-card-text>
    <b-button
      size="sm"
      variant="success"
      squared
      style="width:152px;font-size:11px;"
      @click.prevent="addToCart"
    >
      <div class="text-capitalize">
        <font-awesome-icon :icon="['fas', 'shopping-cart']" />
        Masukkan Keranjang
      </div>
    </b-button>
  </b-card>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

const Toast = Swal.mixin({
  toast: true,
  position: "bottom-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  onOpen: toast => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  }
});

export default {
  props: ["productData"],
  methods: {
    showProductDetail() {
      this.$router.push({ path: `/products/${this.productData._id}` });
    },
    addToCart() {
      axios({
        method: "POST",
        url: `${this.$baseUrl}/carts/${this.productData._id}`,
        headers: {
          token: localStorage.token
        },
        data: {
          stock: 1
        }
      })
        .then(() => {
          Toast.fire({
            icon: "success",
            title: "Berhasil Ditambahkan ke Keranjang"
          });
          this.$emit("updateCart", true);
        })
        .catch(err => {
          if (err.response.data.msg === "Invalid Token") {
            this.$swal(
              "Oops..",
              "Masook dulu untuk menambahkan keranjang",
              "error"
            );
          } else if (
            err.response.data.err.errMessage === "Product already in cart"
          ) {
            this.$swal(
              "Oops..",
              "Barang ini sudah ada di keranjangmu, buka keranjangmu untuk melakukan perubahan",
              "error"
            );
          } else if (
            err.response.data.err.errMessage ===
            "Cannot put your own product to cart"
          ) {
            this.$swal(
              "Oops..",
              "Kamu tidak bisa memasukkan barang daganganmu sendiri ke keranjang",
              "error"
            );
          } else {
            console.log(err.response);
            this.$swal("Oops..", err.response.data.err.errMessage, "error");
          }
        });
    }
  }
};
</script>

<style scoped>
.card-body {
  padding: 0px;
  height: 260px;
  width: 152px;
  max-height: 260px;
}

.card-body:hover {
  border: 1px solid green;
}

.card-body:hover button {
  display: block;
}

img {
  width: 150px;
  height: 150px;
}

article {
  margin-right: 0px;
}

button {
  display: none;
}
</style>
