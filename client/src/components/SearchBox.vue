<template>
  <b-input-group size="sm">
    <template v-slot:append>
      <b-input-group-text>
        <b-icon icon="search" scale="1" variant="secondary"></b-icon>
      </b-input-group-text>
    </template>
    <b-form-input
      v-model="search"
      placeholder="Cari produk disini"
      @keyup.prevent="searchProduct"
    ></b-form-input>
  </b-input-group>
</template>

<script>
export default {
  data() {
    return {
      search: null
    };
  },
  methods: {
    searchProduct(e) {
      if (e.keyCode === 13 || this.search == "") {
        this.$emit("search", this.search);
      }
    }
  }
};
</script>
