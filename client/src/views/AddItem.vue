<template>
  <div class="d-flex justify-content-center row py-5 konten">
    <!-- product -->
    <div class="card col-sm-8 p-0 mb-5">
      <h5 class="card-header">Product</h5>
      <div class="card-body">
        <h5 class="card-title">Product Title:</h5>
        <b-form-input
          v-model="product.title"
          placeholder="Enter your name"
        ></b-form-input>
        <b-form-select
          v-model="product.category"
          :options="options"
          class="mt-3"
        >
          <!-- This slot appears above the options from 'options' prop -->
          <template v-slot:first>
            <b-form-select-option :value="null" disabled
              >-- Please select one category --</b-form-select-option
            >
          </template>
        </b-form-select>
      </div>
    </div>
    <!-- detail -->
    <div class="card col-sm-8 p-0 mb-5">
      <h5 class="card-header">Product</h5>
      <div class="card-body">
        <h5 class="card-title">Product Title:</h5>
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon1">Rp</span>
          </div>
          <b-form-input
            v-model="product.price"
            class="form-control"
            type="number"
            placeholder="Price 000000000000 (Dont use comma) "
          ></b-form-input>
        </div>
        <div class="input-group mb-3">
          <b-form-input
            v-model="product.stock"
            class="form-control"
            type="number"
            placeholder="Jumlah Produk (jangan pake koma dan titik)"
          ></b-form-input>
          <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon1">Buah</span>
          </div>
        </div>
        <b-form-textarea
          id="textarea"
          v-model="product.description"
          placeholder="Enter something..."
          rows="3"
          max-rows="6"
        ></b-form-textarea>
      </div>
    </div>

    <!-- image -->
    <div class="card col-sm-8 p-0 mb-5">
      <h5 class="card-header">Image</h5>
      <b-img
        v-if="url"
        class="productImage mt-3"
        :src="url"
        alt="Fluid image"
      ></b-img>
      <h5 v-if="!url" class="card-title mt-3 ml-3">Product Title:</h5>

      <b-form-file
        @change="onFileChange"
        v-model="product.file"
        class="btn btn-light my-3 inputFile"
        plain
      ></b-form-file>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AddItem',
  data() {
    return {
      product: {
        title: '',
        file: null,
        category: null,
        price: null,
        stock: null,
        description: null
      },
      url: '',
      options: [
        { value: 'keyboard', text: 'Keyboard' },
        { value: 'drum', text: 'Drum' },
        { value: 'bass', text: 'Bass' },
        { value: 'guitar', text: 'Guitar' },
        { value: 'saxophoe', text: 'saxophone' }
      ]
    }
  },
  methods: {
    onFileChange(e) {
      const file = e.target.files[0]
      this.url = URL.createObjectURL(file)
    }
  }
}
</script>

<style scoped>
.konten {
  background-color: #f5f5f5;
}
.productImage {
  width: fit-content;
  align-self: center;
  max-height: 60vh;
}

.tambahan {
  place-content: center;
}

.inputNumber {
  max-width: 122vh;
}

.inputFile {
  width: fit-content;
  /* margin-left: 0.5vh; */
  align-self: center;
}
</style>
