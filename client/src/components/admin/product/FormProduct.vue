<template>
  <div>
    <button
      class="btn btn-primary btn-sm float-right mt-1"
      @click="(modalShow = !modalShow), CLEAR_PRODUCT(), modalDisabledFalse(), SET_ISUPDATE(false)"
    >
      Add product
    </button>
    <b-modal v-model="modalShow" title="Form product" id="modalShow">
      <div class="row">
        <div class="col-12 form-group">
          <label for="name">Name</label>
          <input
            type="text"
            class="form-control"
            id="name"
            v-model="product.name"
            :disabled="modalDisabled"
          />
        </div>
        <div class="col-6 form-group">
          <label for="price">Price</label>
          <input
            type="number"
            class="form-control"
            id="price"
            v-model="product.price"
            :disabled="modalDisabled"
          />
        </div>
        <div class="col-6 form-group">
          <label for="stock">Stock</label>
          <input
            type="number"
            class="form-control"
            id="stock"
            v-model="product.stock"
            :disabled="modalDisabled"
          />
        </div>
        <div class="col-12 form-group">
          <label for="description">Description</label>
          <textarea
            class="form-control"
            id="description"
            rows="3"
            v-model="product.description"
            :disabled="modalDisabled"
          ></textarea>
        </div>
        <div class="col-12 input-group">
          <div class="input-group-prepend">
            <span class="input-group-text" id="image-file">Image</span>
          </div>
          <div class="custom-file">
            <input
              type="file"
              class="custom-file-input"
              id="image-file"
              aria-describedby="image-file"
              @change="onFileChange"
              :disabled="modalDisabled"
            />
            <label class="custom-file-label" for="image-file">Choose image. max 5mb</label>
          </div>
        </div>
        <div class="col-12 text-center">
          <b-spinner type="grow" label="Loading..." v-if="loadImage && !product.image"></b-spinner>
          <img
            :src="product.image"
            class="rounded mx-auto d-block mt-2"
            alt="image-file"
            v-if="product.image"
            height="150"
            width="150"
          />
        </div>
      </div>
      <template v-slot:modal-footer="{ cancel }">
        <b-button size="sm" variant="danger" @click="cancel()">
          Cancel
        </b-button>
        <b-button size="sm" variant="primary" @click="save" v-if="!isUpdate">
          Add
        </b-button>
        <b-button size="sm" variant="primary" @click="update" v-if="isUpdate">
          Update
        </b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex';

export default {
  name: 'FormProduct',

  data() {
    return {
      modalShow: false,
      loadImage: false,
    };
  },
  props: ['hideModal', 'modalDisabled'],
  computed: {
    ...mapState('Product', ['product', 'isUpdate']),
  },
  methods: {
    ...mapActions('Product', ['createProduct', 'updateProduct', 'uploadImage']),
    ...mapMutations('Product', ['SET_ERRORS', 'CLEAR_PRODUCT', 'SET_ISUPDATE']),
    save() {
      if (this.loadImage && !this.product.image) {
        this.SET_ERRORS('Upload image in processing or image is required');
      } else {
        this.createProduct(this.product);
      }
    },
    update() {
      if (this.loadImage && !this.product.image) {
        this.SET_ERRORS('Upload image in processing or image is required');
      } else {
        this.updateProduct(this.product);
      }
    },
    onFileChange(e) {
      const file = e.target.files[0];
      if (file) {
        const form = new FormData();
        form.append('image', file);
        this.product.image = null;
        this.loadImage = true;
        this.uploadImage(form);
      }
    },
    modalDisabledFalse() {
      this.$emit('modalDisabledFalse');
    },
  },
  watch: {
    hideModal() {
      this.modalShow = !this.modalShow;
    },
  },
};
</script>

<style lang="css" scoped></style>
