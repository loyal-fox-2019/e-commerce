<template>
  <div>
    <b-row class="m-5" v-if="product">
      <b-col cols="6" class="p-0" style="max-width: 500px;">
        <b-img-lazy :src="selectedImage"></b-img-lazy>
      </b-col>
      <b-col cols="2">
        <b-row v-for="image in product.images" :key="image" class="mb-2">
          <b-col>
            <a href="#" @click.prevent="changePreview(image)">
              <b-img-lazy :src="image" style="max-width:100px;"></b-img-lazy>
            </a>
          </b-col>
        </b-row>
      </b-col>
      <b-col cols="4">
        <h2 class="text-capitalize font-weight-bold" v-if="!editMode">
          {{ product.name }}
        </h2>
        <b-input-group-append v-if="isOwner && editMode">
          <b-form-input
            size="lg"
            v-model="product.name"
            class="text-center p-0 w-100"
          ></b-form-input>
        </b-input-group-append>
        <table class="table table-borderless">
          <tbody>
            <tr v-if="!editMode">
              <th scope="row">Harga</th>
              <td
                class="font-weight-bold"
                style="color:#FA8030;font-size:23px;"
              >
                Rp. {{ formattedCurrency }}
              </td>
            </tr>
            <tr v-if="isOwner && editMode">
              <th scope="row">Harga</th>
              <td>
                <b-input-group-append>
                  <b-form-input
                    size="sm"
                    v-model="product.price"
                    class="text-center p-0 w-50"
                  ></b-form-input>
                </b-input-group-append>
              </td>
            </tr>
            <tr v-if="!editMode">
              <th scope="row">Stok Tersedia</th>
              <td>{{ product.stock }}</td>
            </tr>
            <tr v-if="isOwner && editMode">
              <th scope="row">Stok Tersedia</th>
              <td>
                <b-input-group-append>
                  <b-form-input
                    size="sm"
                    v-model="product.stock"
                    class="text-center p-0 w-50"
                  ></b-form-input>
                </b-input-group-append>
              </td>
            </tr>
            <tr v-if="!isOwner">
              <th scope="row">&nbsp;</th>
              <td>
                <b-input-group-append>
                  <b-button
                    size="sm"
                    variant="danger"
                    @click.prevent="decStock"
                  >
                    -
                  </b-button>
                  <b-form-input
                    size="sm"
                    v-model="stockToCart"
                    class="text-center p-0 w-50"
                    @change="checkStock"
                  ></b-form-input>
                  <b-button
                    size="sm"
                    variant="success"
                    @click.prevent="incStock"
                  >
                    +
                  </b-button>
                </b-input-group-append>
                <span class="text-muted" style="font-size:11px;">
                  Minimum pembelian 1 pcs
                </span>
              </td>
            </tr>
            <tr>
              <th scope="row">Penjual</th>
              <td>{{ product.seller.fullname }}</td>
            </tr>
          </tbody>
        </table>
        <div v-if="isOwner">
          <span class="mx-2">
            <b-button
              variant="outline-danger"
              squared
              @click.prevent="confirmDelete"
            >
              <font-awesome-icon :icon="['fas', 'trash']" />
              Hapus Produk
            </b-button>
          </span>
          <span>
            <b-button
              variant="info"
              squared
              @click.prevent="editMode = true"
              v-if="isOwner && !editMode"
            >
              <font-awesome-icon :icon="['fas', 'edit']" />
              Edit Produk
            </b-button>
            <b-button
              variant="success"
              squared
              @click.prevent="saveData"
              v-if="isOwner && editMode"
            >
              <font-awesome-icon :icon="['fas', 'save']" />
              Simpan perubahan
            </b-button>
            <b-button
              variant="link"
              @click.prevent="editMode = false"
              v-if="isOwner && editMode"
            >
              Batalkan perubahan
            </b-button>
          </span>
        </div>

        <b-button
          v-if="!isOwner"
          variant="outline-success"
          squared
          block
          @click.prevent="addToCart"
        >
          <font-awesome-icon :icon="['fas', 'shopping-cart']" />
          Masukkan Keranjang
        </b-button>
      </b-col>
    </b-row>
    <product-list></product-list>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
import ProductList from "@/views/ProductList.vue";

const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: "btn btn-danger",
    cancelButton: "btn btn-link"
  },
  buttonsStyling: false
});

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
  data() {
    return {
      product: null,
      selectedImage: null,
      stockToCart: 1,
      editMode: false
    };
  },
  components: {
    ProductList
  },
  methods: {
    saveData() {
      this.editMode = false;
      axios({
        method: "PUT",
        url: `${this.$baseUrl}/products/${this.product._id}`,
        headers: {
          token: localStorage.token
        },
        data: this.product
      })
        .then(() => {
          Toast.fire({
            icon: "success",
            title: "Data perubahan berhasil disimpan"
          });
          this.getDetailData();
        })
        .catch(err => {
          console.log(err);
          this.$swal(
            "Error",
            "Ada masalah nih di server, coba lagi nanti ya",
            "error"
          );
          this.getDetailData();
        });
    },
    changePreview(img) {
      this.selectedImage = img;
    },
    incStock() {
      if (this.stockToCart + 1 <= this.product.stock) {
        this.stockToCart += 1;
      }
    },
    decStock() {
      if (this.stockToCart - 1 > 0) {
        this.stockToCart -= 1;
      }
    },
    checkStock() {
      if (this.stockToCart > this.product.stock) {
        this.$swal(
          "Oops..",
          "Kamu memesan barang melebihi stok barang tersedia, kami akan memasukkan jumlah maksimal stok pada keranjangmu",
          "error"
        );
        this.stockToCart = this.product.stock;
      } else if (this.stockToCart < 1) {
        this.stockToCart = 1;
      }
    },
    addToCart() {
      axios({
        method: "POST",
        url: `${this.$baseUrl}/carts/${this.product._id}`,
        headers: {
          token: localStorage.token
        },
        data: {
          stock: this.stockToCart
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
    },
    getDetailData() {
      axios({
        method: "GET",
        url: `${this.$baseUrl}/products/${this.$route.params.productId}`,
        headers: {
          token: localStorage.token
        }
      })
        .then(({ data }) => {
          this.product = data;
          this.selectedImage = data.images[0];
        })
        .catch(err => {
          console.log(err);
          this.$swal(
            "Error",
            "Ada masalah nih di server, coba lagi nanti ya",
            "error"
          );
        });
    },
    deleteProduct() {
      axios({
        method: "DELETE",
        url: `${this.$baseUrl}/products/${this.product._id}`,
        headers: {
          token: localStorage.token
        }
      })
        .then(() => {
          Toast.fire({
            icon: "success",
            title: "Produk berhasil dihapus"
          });
          this.$router.push({ name: "show products" });
        })
        .catch(err => {
          console.log(err);
          this.$swal(
            "Error",
            "Ada masalah nih di server, coba lagi nanti ya",
            "error"
          );
        });
    },
    confirmDelete() {
      swalWithBootstrapButtons
        .fire({
          title: "Yakin mau hapus produk?",
          text: this.product.name,
          icon: "question",
          showCancelButton: true,
          confirmButtonText: "Ya, hapus saja",
          cancelButtonText: "Tidak jadi",
          reverseButtons: true
        })
        .then(result => {
          if (result.value) {
            this.deleteProduct();
          } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
          ) {
            swalWithBootstrapButtons.fire(
              "Batal",
              "Barangmu pasti bakal laku kok",
              "info"
            );
          }
        });
    }
  },
  created() {
    this.getDetailData();
  },
  watch: {
    $route() {
      this.getDetailData();
    }
  },
  computed: {
    isOwner() {
      return localStorage.userId === this.product.seller._id;
    },
    formattedCurrency() {
      return this.product.price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
    }
  }
};
</script>

<style scoped>
img {
  max-width: 500px;
}

a img:hover {
  border: 2px solid orange;
}
</style>
