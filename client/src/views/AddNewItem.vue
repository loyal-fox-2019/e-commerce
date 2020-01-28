<template>
  <div class="addNewItem container mt-2">
    <h1>Add New Product</h1>
    <b-form>
      <!-- TITLE -->
      <b-form-group
        id="input-group-title"
        label="Title:"
        label-for="input-title"
        description="Fill an awesome title!"
      >
        <b-form-input
          id="input-title"
          v-model="newItem.title"
          type="text"
          required
          placeholder="Enter title"
        ></b-form-input>
      </b-form-group>

      <!-- PRICE -->
      <b-form-group
        id="input-group-price"
        label="Price:"
        label-for="input-price"
        description="Fill an awesome price!"
      >
        <b-form-input
          id="input-price"
          v-model="newItem.price"
          type="number"
          required
          placeholder="Enter price"
        ></b-form-input>
      </b-form-group>

      <!-- STOCK -->
      <b-form-group
        id="input-group-stock"
        label="Stock:"
        label-for="input-stock"
        description="Fill an awesome stock!"
      >
        <b-form-input
          id="input-stock"
          v-model="newItem.stock"
          type="number"
          required
          placeholder="Enter stock"
        ></b-form-input>
      </b-form-group>

      <!-- DESCRIPTION -->
      <b-form-group
        id="input-group-description"
        label="Description:"
        label-for="input-description"
        description="Fill an awesome description!"
      >
        <b-form-textarea
          id="textarea"
          v-model="newItem.description"
          placeholder="Enter something..."
          rows="6"
        ></b-form-textarea>
      </b-form-group>

      <!-- IMAGE -->
      <b-form-group
        id="input-group-image"
        label="Image:"
        label-for="input-image"
        description="Upload an awesome image!"
      >
        <b-form-file
          v-show="!newItem.image"
          class="mt-3"
          plain
          @change="onFileChange"
        ></b-form-file>
        <b-img show="newItem.image" :src="displayImage"></b-img>
        <b-button
          v-show="newItem.image"
          style="display:block"
          @click="removeImage"
          >Remove Image</b-button
        >
      </b-form-group>
      <div class="d-flex">
        <b-button @click="submitNewItem" class="ml-auto mb-2">SUBMIT</b-button>
      </div>
    </b-form>
  </div>
</template>

<script>
/* eslint-disable prefer-destructuring */
// title
// description
// price
// stock
// image

export default {
  name: 'AddNewItem',
  data() {
    return {
      newItem: {
        title: null,
        description: null,
        price: null,
        stock: null,
        image: null
      },
      displayImage: null
    };
  },
  methods: {
    onFileChange(e) {
      // buat ambil image
      const files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.newItem.image = files[0];
      this.createImage(files[0]);
    },
    createImage(file) {
      // buat bikin image
      const reader = new FileReader();
      const vm = this;
      reader.onload = e => {
        vm.displayImage = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    removeImage() {
      // buat remove image
      this.newItem.image = null;
      this.displayImage = null;
    },
    submitNewItem() {
      this.$store.dispatch('createProduct', this.newItem);
    }
  }
};
</script>

<style>
</style>