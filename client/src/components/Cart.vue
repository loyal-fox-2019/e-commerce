<template>
  <b-card no-body class="overflow-hidden shadow-sm">
    <b-row style="font-size:13px;">
      <b-col cols="2" align-self="center">
        <b-card-img
          :src="cartData.product.images[0]"
          class="rounded-0"
          style="max-width:200px;max-height:200px;"
        ></b-card-img>
      </b-col>
      <b-col cols="2" align-self="center">
        <b-card-body>
          <b-card-text class="font-weight-bold">
            {{ cartData.product.name }}
          </b-card-text>
        </b-card-body>
      </b-col>
      <b-col cols="2" align-self="center">
        <b-card-body>
          <b-card-text style="font-size:11px;">
            Rp.
            {{
              cartData.product.price
                .toFixed(2)
                .replace(/\d(?=(\d{3})+\.)/g, "$&,")
            }}
          </b-card-text>
        </b-card-body>
      </b-col>
      <b-col cols="2" align-self="center">
        <b-card-body>
          <b-card-text>
            <div style="font-size:12px;" v-if="cartData.status !== 'new'">
              Stok dipesan :
              <span class="font-weight-bold">{{ cartData.stock }}</span>
            </div>
            <div v-else>
              <b-input-group-append>
                <b-button size="sm" variant="danger" @click.prevent="decStock">
                  -
                </b-button>
                <b-form-input
                  size="sm"
                  v-model="cartData.stock"
                  class="text-center p-0 w-50"
                  @change="checkStock"
                ></b-form-input>
                <b-button size="sm" variant="success" @click.prevent="incStock">
                  +
                </b-button>
              </b-input-group-append>
            </div>
            <div style="font-size:12px;" v-if="cartData.status === 'new'">
              Stok barang :
              <span class="font-weight-bold">{{ cartData.product.stock }}</span>
            </div>
          </b-card-text>
        </b-card-body>
      </b-col>
      <b-col cols="2" align-self="center">
        <b-card-body>
          <b-card-text
            class="text-danger"
            style="font-size:12px;"
            align-h="end"
          >
            Rp.
            {{
              (cartData.product.price * cartData.stock)
                .toFixed(2)
                .replace(/\d(?=(\d{3})+\.)/g, "$&,")
            }}
          </b-card-text>
        </b-card-body>
      </b-col>
      <b-col cols="2" align-self="center">
        <b-card-body>
          <b-card-text v-if="cartData.status === 'new'">
            <b-button
              variant="link"
              @click.prevent="confirmDelete"
              style="font-size:11px;"
            >
              Hapus dari keranjang
            </b-button>
          </b-card-text>
          <b-card-text v-else-if="cartData.status === 'unpaid'">
            <div>
              <b-button
                variant="link"
                @click.prevent="changeStatus('send')"
                style="font-size:20px;"
              >
                Bayar
              </b-button>
            </div>
            <div>
              <b-button
                variant="link"
                class="text-danger font-weight-bold"
                @click.prevent="confirmCancel"
                style="font-size:10px;"
              >
                Batalkan pesanan
              </b-button>
            </div>
          </b-card-text>
          <b-card-text v-else-if="cartData.status === 'send'">
            <b-button
              variant="link"
              @click.prevent="changeStatus('done')"
              style="font-size:11px;"
            >
              Barang sudah diterima
            </b-button>
          </b-card-text>
        </b-card-body>
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
import Swal from "sweetalert2";
import axios from "axios";

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
  props: ["cartData"],
  data() {
    return {
      cartStock: 1
    };
  },
  methods: {
    changeStatus(newStatus) {
      axios({
        method: "PUT",
        url: `${this.$baseUrl}/carts/status/${this.cartData.product._id}`,
        headers: {
          token: localStorage.token
        },
        data: {
          status: newStatus,
          stock: this.cartData.stock
        }
      })
        .then(() => {
          this.$emit("updateList", this.cartData.status);
          Toast.fire({
            icon: "success",
            title: "Status barang berhasil diubah"
          });
        })
        .catch(err => {
          console.log(err);
          this.$swal(
            "Oops..",
            "Ada masalah nih di server, coba lagi ya",
            "error"
          );
        });
    },
    incStock() {
      if (this.cartData.stock + 1 <= this.cartData.product.stock) {
        this.cartData.stock += 1;
        this.updateStock();
      }
    },
    decStock() {
      if (this.cartData.stock - 1 > 0) {
        this.cartData.stock -= 1;
        this.updateStock();
      }
    },
    updateStock() {
      axios({
        method: "PUT",
        url: `${this.$baseUrl}/carts/${this.cartData.product._id}`,
        headers: {
          token: localStorage.token
        },
        data: {
          stock: this.cartData.stock
        }
      })
        .then(() => {
          Toast.fire({
            icon: "success",
            title: "Stok berhasil diupdate"
          });
        })
        .catch(err => {
          console.log(err);
          this.$swal(
            "Oops..",
            "Ada masalah nih di server, coba lagi ya",
            "error"
          );
        });
    },
    checkStock() {
      if (this.cartData.stock > this.cartData.product.stock) {
        this.$swal(
          "Oops..",
          "Kamu memesan barang melebihi stok barang tersedia, kami akan memasukkan jumlah maksimal stok pada keranjangmu",
          "error"
        );
        this.cartData.stock = this.cartData.product.stock;
      } else if (this.cartData.stock < 1) {
        this.cartData.stock = 1;
      }
    },
    deleteCart() {
      axios({
        method: "DELETE",
        url: `${this.$baseUrl}/carts/${this.cartData.product._id}`,
        headers: {
          token: localStorage.token
        }
      })
        .then(() => {
          Toast.fire({
            icon: "success",
            title: "Barang berhasil dikeluarkan dari keranjang"
          });
          this.$emit("updateList", this.cartData.status);
        })
        .catch(err => {
          console.log(err);
        });
    },
    confirmDelete() {
      swalWithBootstrapButtons
        .fire({
          title: "Yakin mau dikeluarkan dari keranjang?",
          text: this.cartData.product.name,
          icon: "question",
          showCancelButton: true,
          confirmButtonText: "Ya, hapus saja",
          cancelButtonText: "Tidak jadi",
          reverseButtons: true
        })
        .then(result => {
          if (result.value) {
            this.deleteCart();
          } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
          ) {
            swalWithBootstrapButtons.fire(
              "Batal",
              "Yay, keranjangmu aman ditempatnya",
              "info"
            );
          }
        });
    },
    confirmCancel() {
      swalWithBootstrapButtons
        .fire({
          title: "Yakin mau membatalkan pesanan?",
          text: this.cartData.product.name,
          icon: "question",
          showCancelButton: true,
          confirmButtonText: "Ya, batalkan",
          cancelButtonText: "Tidak jadi",
          reverseButtons: true
        })
        .then(result => {
          if (result.value) {
            this.changeStatus("cancel");
          } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
          ) {
            swalWithBootstrapButtons.fire(
              "Batal",
              "Yay, pesananmu akan aman sampai terbayar",
              "info"
            );
          }
        });
    }
  }
};
</script>

<style scoped>
.card-body {
  margin-left: 0px;
  margin-right: 0px;
  padding: 0px;
}
</style>
