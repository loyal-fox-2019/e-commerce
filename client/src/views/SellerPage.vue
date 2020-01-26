<template>
  <b-container style="font-size:13px;" class="mb-5">
    <h1 class="text-center my-5">Halaman Penjualan</h1>
    <b-alert show variant="success">
      <h4 class="alert-heading">Tata krama berjualan yang baik:</h4>
      <ol>
        <li>Siapkan semua produk yang akan dijual</li>
        <li>Pastikan produk dalam kondisi baik dan masih layak</li>
        <li>Foto-fotoin produknya biar keliatan keren</li>
        <li>Kulik informasi mendetail seputar produk yang akan dijual</li>
        <li>Isi form dibawah ini untuk memulai berjualan</li>
      </ol>
      <hr />
      <p class="mb-0 text-right font-weight-bold">
        Selamat berjualan dan semoga lekas laku
      </p>
    </b-alert>
    <b-form @submit="addNewProduct">
      <b-row>
        <b-col>
          <b-card class="my-2 shadow-sm">
            <template v-slot:header>
              <h2 class="mb-0 text-center font-weight-bold">
                Upload Produk
              </h2>
            </template>
            <b-card-text>
              <b-form-group
                id="fieldset-horizontal"
                label-cols-sm="4"
                label-cols-lg="3"
                description="Pilih gambar terbaik dari produkmu dan upload disini"
                label="Foto Produk"
                label-for="input-images"
              >
                <b-form-file
                  accept="image/jpeg, image/png, image/gif"
                  :state="Boolean(form.images)"
                  placeholder="Pilih gambar produk terbaikmu..."
                  drop-placeholder="Letakkan gambar produkmu disini..."
                  size="lg"
                  multiple
                  @change.prevent="addImagesToModel"
                  enctype="multipart/form-data"
                ></b-form-file>
              </b-form-group>
            </b-card-text>
          </b-card>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-card class="my-2 shadow-sm">
            <template v-slot:header>
              <h2 class="mb-0 text-center font-weight-bold">
                Informasi Produk
              </h2>
            </template>
            <b-card-text>
              <b-form-group
                id="input-name"
                label-cols-sm="4"
                label-cols-lg="3"
                label="Nama Produk"
                label-for="product-name"
              >
                <b-form-input
                  id="product-name"
                  v-model="form.name"
                  type="text"
                  required
                  placeholder="Nama produkmu disini"
                ></b-form-input>
              </b-form-group>

              <b-form-group
                id="price"
                label-cols-sm="4"
                label-cols-lg="3"
                label="Harga Produk"
                label-for="product-price"
              >
                <b-form-input
                  id="product-price"
                  v-model="form.price"
                  type="number"
                  required
                  placeholder="Berapa nih harganya?"
                ></b-form-input>
              </b-form-group>

              <b-form-group
                id="stock"
                label-cols-sm="4"
                label-cols-lg="3"
                label="Stock Barang"
                label-for="product-stock"
              >
                <b-form-input
                  id="product-stock"
                  v-model="form.stock"
                  type="number"
                  required
                  placeholder="Berapa banyak yang dijual?"
                ></b-form-input>
              </b-form-group>
            </b-card-text>
          </b-card>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-button
            type="cancel"
            variant="link"
            class="text-danger"
            to="/products"
          >
            Tidak jadi jual
          </b-button>
          <b-button type="submit" variant="primary">Simpan dan jual</b-button>
        </b-col>
      </b-row>
    </b-form>
  </b-container>
</template>

<script>
// import Navbar from "@/components/Navbar.vue";
// import ProductCard from "@/components/ProductCard.vue";
import axios from "axios";
import Swal from "sweetalert2";

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  onOpen: toast => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  }
});

export default {
  name: "seller",
  components: {
    //   ProductCard
  },
  data() {
    return {
      form: {
        name: null,
        images: null,
        price: null,
        stock: null
      }
    };
  },
  methods: {
    addImagesToModel() {
      this.form.images = event.target.files;
    },
    addNewProduct(evt) {
      evt.preventDefault();

      let sendData = new FormData();
      this.form.images.forEach(image => {
        sendData.append("images", image);
      });
      sendData.append("name", this.form.name);
      sendData.append("price", this.form.price);
      sendData.append("stock", this.form.stock);

      axios({
        method: "POST",
        url: `${this.$baseUrl}/products`,
        headers: {
          token: localStorage.token
        },
        data: sendData
      })
        .then(({ data }) => {
          Toast.fire({
            icon: "success",
            title: `${data.name} siap dijual`
          });
          this.$router.push({ name: "home" });
        })
        .catch(err => {
          console.log(err);
          Toast.fire({
            icon: "error",
            title: "Oops.. Sepertinya ada masalah, coba lagi nanti ya"
          });
        });
    }
  }
};
</script>
