<template>
  <div>
    <form class="center p-5">
      <div class="form-group">
        <div class="d-flex">
          <label for="name" class="mr-3">
            <h4>Name</h4>
          </label>
          <input
            type="text"
            class="form-control"
            id="name"
            placeholder="Enter product's name"
            v-model="name"
          />
        </div>
      </div>

      <div class="d-flex">
        <!-- <div class="col-6"> -->
        <label for="stock" class="mr-3">
          <h4>Stock</h4>
        </label>
        <b-form-input id="stock" type="number" min="0" style="width: 200px" v-model="stock"></b-form-input>
        <!-- </div> -->
        <!-- <div class="col-6"> -->
        <label for="price" class="mx-3">
          <h4>Price</h4>
        </label>
        <span>
          <h4>RP</h4>
        </span>
        <b-form-input id="price" type="number" min="0" style="width: 200px" v-model="price"></b-form-input>
        <!-- </div> -->
      </div>
      <!-- <b-form-group> -->
      <div class="d-flex my-3 form-group">
        <label for="desc" class="mr-3">
          <h4>Description</h4>
        </label>
        <textarea id="desc" cols="100" rows="10" v-model="description"></textarea>
      </div>
      <!-- </b-form-group> -->
      <label for="file" class="mt-3">
        <h4>Picture</h4>
      </label>
      <b-form-file
        id="file"
        placeholder="Choose a file or drop it here..."
        drop-placeholder="Drop file here..."
        name="file"
        v-on:change="uploadGambar"
      ></b-form-file>
      <div class="row justify-content-end mt-3">
        <!-- <a class="btn btn-primary text-white mt-3" v-on:click="sell">Save!</a> -->
        <b-button variant="primary" v-on:click="sell">Sell</b-button>
      </div>
    </form>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import axios from "axios";
export default {
  name: "addProduct",
  data() {
    return {
      name: "",
      price: "",
      description: "",
      file: "",
      stock: "",
      baseUrl: "http://localhost:3000"
    };
  },
  methods: {
    uploadGambar(e) {
      this.file = e.target.files[0];
    },
    sell() {
      let url = this.baseUrl;
      let name = this.name;
      let description = this.description;
      let stock = this.stock;
      let price = this.price;
      let file = this.file;
      let formData = new FormData();
      formData.append("formData", formData);
      formData.append("name", name);
      formData.append("description", description);
      formData.append("stock", stock);
      formData.append("price", price);
      formData.append("file", file);
      axios({
        method: "POST",
        url: `${url}/product`,
        headers: {
          token: localStorage.getItem("token")
        },
        data: formData
      })
        .then(() => {
          this.$router.push("/myProducts");
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

<style>
</style>