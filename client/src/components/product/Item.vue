<template>
  <div>
    <sui-card style="padding: 5px">
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
      <div v-if="$route.path == '/cart/myproduct'">
        <sui-button @click="showModal(item._id)" variant="primary">Edit</sui-button>
        <sui-button variant="danger" @click.prevent="hafus">Delete</sui-button>
      </div>
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
        <sui-button @click.prevent="addToCart">
          Add to cart
          <i class="cart plus icon"></i>
        </sui-button>
      </div>
    </sui-card>
    <!-- modal start here -->
    <div id="for-modal">
      <b-modal :id="item._id" size="xl" hide-footer title="Add Product">
        <div id="inside">
          <form @submit.prevent="editProduct">
            <b>gambar barang:</b>
            <b-form-file
              v-model="image"
              :state="Boolean(image)"
              placeholder="Choose a image or drop it here..."
              drop-placeholder="Drop image here..."
              required
            ></b-form-file>
            <div class="ui equal width form" style="margin-top:5px;">
              <div class="fields">
                <div class="field">
                  <label>Nama</label>
                  <input type="text" required placeholder="nama barang" v-model="namaBarang" />
                </div>
                <div class="field">
                  <label>Harga (Rupiah)</label>
                  <input type="number" required placeholder="harga barang kamu" v-model="harga" />
                </div>
              </div>
              <div class="fields">
                <div class="field">
                  <label>Stock</label>
                  <input
                    type="number"
                    min="1"
                    required
                    placeholder="berapa banyak ??"
                    v-model="stock"
                  />
                </div>
                <div class="field">
                  <label>Berat (kg)</label>
                  <input type="text" required placeholder="kilogram ya.. :D" v-model="berat" />
                </div>
                <div class="field">
                  <label>Kota barang</label>
                  <input
                    type="text"
                    required
                    placeholder="barang dikirim dari mana?"
                    v-model="kota"
                  />
                </div>
              </div>
              <div class="fields">
                <div class="field">
                  <label>Deskripsi</label>
                  <textarea
                    rows="2"
                    style="height: 119px;"
                    required
                    placeholder="deskripsikan barang kamu disini..."
                    v-model="description"
                  ></textarea>
                </div>
              </div>
              <div class="field" style="display: flex; justify-content: flex-end;">
                <sui-button type="submit" secondary>Jual ini</sui-button>
              </div>
            </div>
          </form>
        </div>
      </b-modal>
    </div>
    <!-- modal end here -->
  </div>
</template>

<script>
import VueNumericInput from "vue-numeric-input";

export default {
  name: "ItemCard",
  props: ["item"],
  components: {
    VueNumericInput
  },
  beforeMount() {
    this.image = this.item.image;
    this.namaBarang = this.item.name;
    this.description = this.item.description;
    this.harga = this.item.price;
    this.stock = this.item.stock;
    this.berat = this.item.weight;
    this.kota = this.item.city;
  },
  data() {
    return {
      image: "",
      namaBarang: "",
      harga: 0,
      description: "",
      stock: 1,
      berat: "0.1",
      kota: "Jakarta",
      value: 1
    };
  },
  methods: {
    showModal(id) {
      console.log(id);
      this.$bvModal.show(id);
    },
    addToCart() {
      this.axios({
        url: "carts",
        method: "post",
        data: {
          product: this.item,
          qty: this.value
        }
      })
        .then(({ data }) => {
          // sebentar ini mau di apain?
          this.$swal.fire("success added to cart");
          console.log(data);
        })
        .catch(err => {
          console.log(err.response.data);
          this.$swal.fire("maaf", err.response.data.message);
        });
    },
    editProduct() {
      const formData = new FormData();
      formData.append("image", this.image);
      formData.set("name", this.namaBarang);
      formData.set("description", this.description);
      formData.set("price", this.harga);
      formData.set("stock", this.stock);
      formData.set("weight", this.berat);
      formData.set("city", this.kota);

      this.axios({
        method: "PUT",
        url: "products/" + this.item._id,
        data: formData
      })
        .then(({ data }) => {
          this.$store.dispatch("fetchMyProducts");
          this.$bvModal.hide(this.item._id);
          this.$router.push("/cart/myproduct");
        })
        .catch(err => {
          console.log(err.response);
          this.$swal.fire(err.response.data.message)
        });
    },
    hafus() {
      this.axios({
        method: "delete",
        url: "products/" + this.item._id
      })
        .then(({ data }) => {
          this.$store.dispatch("fetchMyProducts");
          this.$swal.fire("Terhapus");
        })
        .catch(err => {
          console.log(err.response.data);
          this.$swal.fire("Something went wrong...");
        });
    }
  }
};
</script>

<style>
</style>