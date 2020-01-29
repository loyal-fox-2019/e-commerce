<template>
  <div>
    <div class="card" style="padding: 5px 150px 20px;">
      <h4 class="card-header">Add Item</h4>
      <div class="card-body">
        <form
          @submit.prevent="createItem"
          action="/upload-single"
          method="post"
          enctype="multipart/form-data"
        >
          <div class="form-group">
            <label for="exampleInputName1">Name</label>
            <input
              v-model="name"
              type="text"
              class="form-control"
              id="exampleInputName1"
              aria-describedby="nameHelp"
              placeholder="Enter name"
            />
          </div>
          <div class="form-group">
            <label for="exampleInputDescription1">Description</label>
            <input
              v-model="description"
              type="text"
              class="form-control"
              id="exampleInputDescription1"
              aria-describedby="descriptionHelp"
              placeholder="Enter description"
            />
          </div>
          <div class="form-group">
            <label for="exampleInputStock1">Stock</label>
            <input
              v-model="stock"
              type="text"
              class="form-control"
              id="exampleInputStock1"
              aria-describedby="stockHelp"
              placeholder="Enter stock"
            />
          </div>
          <div class="form-group">
            <label for="exampleInputPrice1">Price</label>
            <input
              v-model="price"
              type="text"
              class="form-control"
              id="exampleInputPrice1"
              aria-describedby="priceHelp"
              placeholder="Enter price"
            />
          </div>
          <div class="input-group mb-4">
            <div class="custom-file">
              <input
                v-on:change="handleFileUpload"
                name="featured_image"
                type="file"
                class="form-control-file"
                id="exampleFormControlFile1"
              />
            </div>
          </div>
          <button @click.prevent="goback" type="button" class="btn btn-primary">Cancel</button>
          <button @click.prevent="createItem" type="submit" class="btn btn-primary ml-5">Add</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
export default {
  name: "addItem",
  data() {
    return {
      name: "",
      description: "",
      price: "",
      stock: "",
      image: null,
      items: []
    };
  },
  methods: {
    createItem() {
      let formData = new FormData();
      formData.append("name", this.name);
      formData.append("description", this.description);
      formData.append("price", this.price);
      formData.append("stock", this.stock);
      formData.append("image", this.image);
      axios({
        url: "http://localhost:3000/items",
        method: "POST",
        data: formData,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          this.$emit("submitItem");
          Swal.fire("Good job!", "You clicked the button!", "success");
        })
        .catch(err => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: err
          });
        });
    },
    goback() {
      this.$emit("getBack");
    },
    handleFileUpload(event) {
      this.image = event.target.files[0];
    }
  }
};
</script>

<style>
</style>